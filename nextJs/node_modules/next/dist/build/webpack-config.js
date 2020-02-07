"use strict";exports.__esModule=true;exports.default=getBaseWebpackConfig;var _chalk=_interopRequireDefault(require("chalk"));var _crypto=_interopRequireDefault(require("crypto"));var _forkTsCheckerWebpackPlugin=_interopRequireDefault(require("fork-ts-checker-webpack-plugin"));var _miniCssExtractPlugin=_interopRequireDefault(require("mini-css-extract-plugin"));var _path=_interopRequireDefault(require("path"));var _pnpWebpackPlugin=_interopRequireDefault(require("pnp-webpack-plugin"));var _webpack=_interopRequireDefault(require("webpack"));var _constants=require("../lib/constants");var _fileExists=require("../lib/file-exists");var _resolveRequest=require("../lib/resolve-request");var _constants2=require("../next-server/lib/constants");var _findPageFile=require("../server/lib/find-page-file");var _collectPlugins=require("./plugins/collect-plugins");var _nextPluginLoader=require("./webpack/loaders/next-plugin-loader");var _buildManifestPlugin=_interopRequireDefault(require("./webpack/plugins/build-manifest-plugin"));var _chunkNamesPlugin=_interopRequireDefault(require("./webpack/plugins/chunk-names-plugin"));var _cssMinimizerPlugin=require("./webpack/plugins/css-minimizer-plugin");var _dllImport=require("./webpack/plugins/dll-import");var _nextDropClientPagePlugin=require("./webpack/plugins/next-drop-client-page-plugin");var _nextEsmPlugin=_interopRequireDefault(require("./webpack/plugins/next-esm-plugin"));var _nextjsSsrImport=_interopRequireDefault(require("./webpack/plugins/nextjs-ssr-import"));var _nextjsSsrModuleCache=_interopRequireDefault(require("./webpack/plugins/nextjs-ssr-module-cache"));var _pagesManifestPlugin=_interopRequireDefault(require("./webpack/plugins/pages-manifest-plugin"));var _profilingPlugin=require("./webpack/plugins/profiling-plugin");var _reactLoadablePlugin=require("./webpack/plugins/react-loadable-plugin");var _serverlessPlugin=require("./webpack/plugins/serverless-plugin");var _index=require("./webpack/plugins/terser-webpack-plugin/src/index");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}// @ts-ignore: Currently missing types
const escapePathVariables=value=>{return typeof value==='string'?value.replace(/\[(\\*[\w:]+\\*)\]/gi,'[\\$1\\]'):value;};function getOptimizedAliases(isServer){if(isServer){return{};}const stubWindowFetch=_path.default.join(__dirname,'polyfills','fetch','index.js');const stubObjectAssign=_path.default.join(__dirname,'polyfills','object-assign.js');const shimAssign=_path.default.join(__dirname,'polyfills','object.assign');return{// Polyfill: Window#fetch
__next_polyfill__fetch:require.resolve('whatwg-fetch'),unfetch$:stubWindowFetch,'isomorphic-unfetch$':stubWindowFetch,'whatwg-fetch$':_path.default.join(__dirname,'polyfills','fetch','whatwg-fetch.js'),// Polyfill: Object.assign
__next_polyfill__object_assign:require.resolve('object-assign'),'object-assign$':stubObjectAssign,'@babel/runtime-corejs2/core-js/object/assign':stubObjectAssign,// Stub Package: object.assign
'object.assign/auto':_path.default.join(shimAssign,'auto.js'),'object.assign/implementation':_path.default.join(shimAssign,'implementation.js'),'object.assign$':_path.default.join(shimAssign,'index.js'),'object.assign/polyfill':_path.default.join(shimAssign,'polyfill.js'),'object.assign/shim':_path.default.join(shimAssign,'shim.js')};}async function getBaseWebpackConfig(dir,{buildId,config,dev=false,isServer=false,pagesDir,tracer,target='server',entrypoints}){let plugins=[];let babelPresetPlugins=[];if(config.experimental.plugins){plugins=await(0,_collectPlugins.collectPlugins)(dir,config.env,config.plugins);_nextPluginLoader.pluginLoaderOptions.plugins=plugins;for(const plugin of plugins){if(plugin.middleware.includes('babel-preset-build')){babelPresetPlugins.push({dir:plugin.directory,config:plugin.config});}}}const distDir=_path.default.join(dir,config.distDir);const defaultLoaders={babel:{loader:'next-babel-loader',options:{isServer,distDir,pagesDir,cwd:dir,cache:true,babelPresetPlugins,hasModern:!!config.experimental.modern}},// Backwards compat
hotSelfAccept:{loader:'noop-loader'}};const babelIncludeRegexes=[/next[\\/]dist[\\/]next-server[\\/]lib/,/next[\\/]dist[\\/]client/,/next[\\/]dist[\\/]pages/,/[\\/](strip-ansi|ansi-regex)[\\/]/,...(config.experimental.plugins?_collectPlugins.VALID_MIDDLEWARE.map(name=>new RegExp(`src(\\\\|/)${name}`)):[])];// Support for NODE_PATH
const nodePathList=(process.env.NODE_PATH||'').split(process.platform==='win32'?';':':').filter(p=>!!p);const isServerless=target==='serverless';const isServerlessTrace=target==='experimental-serverless-trace';// Intentionally not using isTargetLikeServerless helper
const isLikeServerless=isServerless||isServerlessTrace;const outputDir=isLikeServerless?_constants2.SERVERLESS_DIRECTORY:_constants2.SERVER_DIRECTORY;const outputPath=_path.default.join(distDir,isServer?outputDir:'');const totalPages=Object.keys(entrypoints).length;const clientEntries=!isServer?{// Backwards compatibility
'main.js':[],[_constants2.CLIENT_STATIC_FILES_RUNTIME_MAIN]:`.${_path.default.sep}`+_path.default.relative(dir,_path.default.join(_constants.NEXT_PROJECT_ROOT_DIST_CLIENT,dev?`next-dev.js`:'next.js')),[_constants2.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS]:_path.default.join(_constants.NEXT_PROJECT_ROOT_DIST_CLIENT,'polyfills.js')}:undefined;let typeScriptPath;try{typeScriptPath=(0,_resolveRequest.resolveRequest)('typescript',`${dir}/`);}catch(_){}const tsConfigPath=_path.default.join(dir,'tsconfig.json');const useTypeScript=Boolean(typeScriptPath&&(await(0,_fileExists.fileExists)(tsConfigPath)));const ignoreTypeScriptErrors=dev?config.typescript&&config.typescript.ignoreDevErrors:config.typescript&&config.typescript.ignoreBuildErrors;const resolveConfig={// Disable .mjs for node_modules bundling
extensions:isServer?[...(useTypeScript?['.tsx','.ts']:[]),'.js','.mjs','.jsx','.json','.wasm']:[...(useTypeScript?['.tsx','.ts']:[]),'.mjs','.js','.jsx','.json','.wasm'],modules:['node_modules',...nodePathList// Support for NODE_PATH environment variable
],alias:{// These aliases make sure the wrapper module is not included in the bundles
// Which makes bundles slightly smaller, but also skips parsing a module that we know will result in this alias
'next/head':'next/dist/next-server/lib/head.js','next/router':'next/dist/client/router.js','next/config':'next/dist/next-server/lib/runtime-config.js','next/dynamic':'next/dist/next-server/lib/dynamic.js',next:_constants.NEXT_PROJECT_ROOT,[_constants.PAGES_DIR_ALIAS]:pagesDir,[_constants.DOT_NEXT_ALIAS]:distDir,...getOptimizedAliases(isServer)},mainFields:isServer?['main','module']:['browser','module','main'],plugins:[_pnpWebpackPlugin.default]};const webpackMode=dev?'development':'production';const terserPluginConfig={cache:true,cpus:config.experimental.cpus,distDir:distDir,parallel:true,sourceMap:false,workerThreads:config.experimental.workerThreads};const terserOptions={parse:{ecma:8},compress:{ecma:5,warnings:false,// The following two options are known to break valid JavaScript code
comparisons:false,inline:2// https://github.com/zeit/next.js/issues/7178#issuecomment-493048965
},mangle:{safari10:true},output:{ecma:5,safari10:true,comments:false,// Fixes usage of Emoji and certain Regex
ascii_only:true}};const devtool=dev?'cheap-module-source-map':false;// Contains various versions of the Webpack SplitChunksPlugin used in different build types
const splitChunksConfigs={dev:{cacheGroups:{default:false,vendors:false}},prod:{chunks:'all',cacheGroups:{default:false,vendors:false,commons:{name:'commons',chunks:'all',minChunks:totalPages>2?totalPages*0.5:2},react:{name:'commons',chunks:'all',test:/[\\/]node_modules[\\/](react|react-dom|scheduler|use-subscription)[\\/]/}}},prodGranular:{chunks:'all',cacheGroups:{default:false,vendors:false,framework:{chunks:'all',name:'framework',// This regex ignores nested copies of framework libraries so they're
// bundled with their issuer.
// https://github.com/zeit/next.js/pull/9012
test:/(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,priority:40,// Don't let webpack eliminate this chunk (prevents this chunk from
// becoming a part of the commons chunk)
enforce:true},lib:{test(module){return module.size()>160000&&/node_modules[/\\]/.test(module.identifier());},name(module){return _crypto.default.createHash('sha1').update(module.libIdent({context:dir})).digest('hex').substring(0,8);},priority:30,minChunks:1,reuseExistingChunk:true},commons:{name:'commons',minChunks:totalPages,priority:20},shared:{name(module,chunks){return _crypto.default.createHash('sha1').update(chunks.reduce((acc,chunk)=>{return acc+chunk.name;},'')).digest('hex');},priority:10,minChunks:2,reuseExistingChunk:true}},maxInitialRequests:25,minSize:20000}};// Select appropriate SplitChunksPlugin config for this build
let splitChunksConfig;if(dev){splitChunksConfig=splitChunksConfigs.dev;}else{splitChunksConfig=config.experimental.granularChunks?splitChunksConfigs.prodGranular:splitChunksConfigs.prod;}const crossOrigin=!config.crossOrigin&&config.experimental.modern?'anonymous':config.crossOrigin;let customAppFile=config.experimental.css?await(0,_findPageFile.findPageFile)(pagesDir,'/_app',config.pageExtensions):null;if(customAppFile){customAppFile=_path.default.resolve(_path.default.join(pagesDir,customAppFile));}let webpackConfig={devtool,mode:webpackMode,name:isServer?'server':'client',target:isServer?'node':'web',externals:!isServer?undefined:!isServerless?[(context,request,callback)=>{const notExternalModules=['next/app','next/document','next/link','next/error','string-hash','next/constants'];if(notExternalModules.indexOf(request)!==-1){return callback();}// make sure we don't externalize anything that is
// supposed to be transpiled
if(babelIncludeRegexes.some(r=>r.test(request))){return callback();}// Relative requires don't need custom resolution, because they
// are relative to requests we've already resolved here.
// Absolute requires (require('/foo')) are extremely uncommon, but
// also have no need for customization as they're already resolved.
const start=request.charAt(0);if(start==='.'||start==='/'){return callback();}// Resolve the import with the webpack provided context, this
// ensures we're resolving the correct version when multiple
// exist.
let res;try{res=(0,_resolveRequest.resolveRequest)(request,`${context}/`);}catch(err){// This is a special case for the Next.js data experiment. This
// will be removed in the future.
// We're telling webpack to externalize a package that doesn't
// exist because we know it won't ever be used at runtime.
if(request==='react-ssr-prepass'&&!config.experimental.ampBindInitData){if(context.replace(/\\/g,'/').includes('next-server/server')){return callback(undefined,`commonjs ${request}`);}}// If the request cannot be resolved, we need to tell webpack to
// "bundle" it so that webpack shows an error (that it cannot be
// resolved).
return callback();}// Same as above, if the request cannot be resolved we need to have
// webpack "bundle" it so it surfaces the not found error.
if(!res){return callback();}// Bundled Node.js code is relocated without its node_modules tree.
// This means we need to make sure its request resolves to the same
// package that'll be available at runtime. If it's not identical,
// we need to bundle the code (even if it _should_ be external).
let baseRes;try{baseRes=(0,_resolveRequest.resolveRequest)(request,`${dir}/`);}catch(err){}// Same as above: if the package, when required from the root,
// would be different from what the real resolution would use, we
// cannot externalize it.
if(baseRes!==res){return callback();}// Default pages have to be transpiled
if(!res.match(/next[/\\]dist[/\\]next-server[/\\]/)&&(res.match(/next[/\\]dist[/\\]/)||res.match(/node_modules[/\\]@babel[/\\]runtime[/\\]/)||res.match(/node_modules[/\\]@babel[/\\]runtime-corejs2[/\\]/))){return callback();}// Webpack itself has to be compiled because it doesn't always use module relative paths
if(res.match(/node_modules[/\\]webpack/)||res.match(/node_modules[/\\]css-loader/)){return callback();}// Anything else that is standard JavaScript within `node_modules`
// can be externalized.
if(res.match(/node_modules[/\\].*\.js$/)){return callback(undefined,`commonjs ${request}`);}// Default behavior: bundle the code!
callback();}]:[// When the 'serverless' target is used all node_modules will be compiled into the output bundles
// So that the 'serverless' bundles have 0 runtime dependencies
'@ampproject/toolbox-optimizer',// except this one
(context,request,callback)=>{if(request==='react-ssr-prepass'&&!config.experimental.ampBindInitData){// if it's the Next.js' require mark it as external
// since it's not used
if(context.replace(/\\/g,'/').includes('next-server/server')){return callback(undefined,`commonjs ${request}`);}}return callback();}],optimization:{checkWasmTypes:false,nodeEnv:false,splitChunks:isServer?false:splitChunksConfig,runtimeChunk:isServer?undefined:{name:_constants2.CLIENT_STATIC_FILES_RUNTIME_WEBPACK},minimize:!(dev||isServer),minimizer:[// Minify JavaScript
new _index.TerserPlugin({...terserPluginConfig,terserOptions}),// Minify CSS
config.experimental.css&&new _cssMinimizerPlugin.CssMinimizerPlugin({postcssOptions:{map:{// `inline: false` generates the source map in a separate file.
// Otherwise, the CSS file is needlessly large.
inline:false,// `annotation: false` skips appending the `sourceMappingURL`
// to the end of the CSS file. Webpack already handles this.
annotation:false}}})].filter(Boolean)},recordsPath:_path.default.join(outputPath,'records.json'),context:dir,// Kept as function to be backwards compatible
entry:async()=>{return{...(clientEntries?clientEntries:{}),...entrypoints,...(isServer?{'init-server.js':'next-plugin-loader?middleware=on-init-server!','on-error-server.js':'next-plugin-loader?middleware=on-error-server!'}:{})};},output:{path:outputPath,filename:({chunk})=>{// Use `[name]-[contenthash].js` in production
if(!dev&&(chunk.name===_constants2.CLIENT_STATIC_FILES_RUNTIME_MAIN||chunk.name===_constants2.CLIENT_STATIC_FILES_RUNTIME_WEBPACK||chunk.name===_constants2.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS)){return chunk.name.replace(/\.js$/,'-[contenthash].js');}return'[name]';},libraryTarget:isServer?'commonjs2':'var',hotUpdateChunkFilename:'static/webpack/[id].[hash].hot-update.js',hotUpdateMainFilename:'static/webpack/[hash].hot-update.json',// This saves chunks with the name given via `import()`
chunkFilename:isServer?`${dev?'[name]':'[name].[contenthash]'}.js`:`static/chunks/${dev?'[name]':'[name].[contenthash]'}.js`,strictModuleExceptionHandling:true,crossOriginLoading:crossOrigin,futureEmitAssets:!dev,webassemblyModuleFilename:'static/wasm/[modulehash].wasm'},performance:false,resolve:resolveConfig,resolveLoader:{// The loaders Next.js provides
alias:['emit-file-loader','error-loader','next-babel-loader','next-client-pages-loader','next-data-loader','next-serverless-loader','noop-loader','next-plugin-loader'].reduce((alias,loader)=>{// using multiple aliases to replace `resolveLoader.modules`
alias[loader]=_path.default.join(__dirname,'webpack','loaders',loader);return alias;},{}),modules:['node_modules',...nodePathList// Support for NODE_PATH environment variable
],plugins:[_pnpWebpackPlugin.default]},// @ts-ignore this is filtered
module:{strictExportPresence:true,rules:[config.experimental.ampBindInitData&&!isServer&&{test:/\.(tsx|ts|js|mjs|jsx)$/,include:[_path.default.join(dir,'data')],use:'next-data-loader'},{test:/\.(tsx|ts|js|mjs|jsx)$/,include:[dir,...babelIncludeRegexes],exclude:path=>{if(babelIncludeRegexes.some(r=>r.test(path))){return false;}return /node_modules/.test(path);},use:defaultLoaders.babel},config.experimental.css&&// Support CSS imports
{oneOf:[{test:/\.css$/,issuer:{include:[customAppFile].filter(Boolean)},use:isServer?// Global CSS is ignored on the server because it's only needed
// on the client-side.
require.resolve('ignore-loader'):[// During development we load CSS via JavaScript so we can
// hot reload it without refreshing the page.
dev&&{loader:require.resolve('style-loader'),options:{// By default, style-loader injects CSS into the bottom
// of <head>. This causes ordering problems between dev
// and prod. To fix this, we render a <noscript> tag as
// an anchor for the styles to be placed before. These
// styles will be applied _before_ <style jsx global>.
insert:function(element){// These elements should always exist. If they do not,
// this code should fail.
var anchorElement=document.querySelector('#__next_css__DO_NOT_USE__');var parentNode=anchorElement.parentNode;// Normally <head>
// Each style tag should be placed right before our
// anchor. By inserting before and not after, we do not
// need to track the last inserted element.
parentNode.insertBefore(element,anchorElement)// Remember: this is development only code.
//
// After styles are injected, we need to remove the
// <style> tags that set `body { display: none; }`.
//
// We use `requestAnimationFrame` as a way to defer
// this operation since there may be multiple style
// tags.
;(self.requestAnimationFrame||setTimeout)(function(){for(var x=document.querySelectorAll('[data-next-hide-fouc]'),i=x.length;i--;){x[i].parentNode.removeChild(x[i]);}});}}},// When building for production we extract CSS into
// separate files.
!dev&&{loader:_miniCssExtractPlugin.default.loader,options:{}},// Resolve CSS `@import`s and `url()`s
{loader:require.resolve('css-loader'),options:{importLoaders:1,sourceMap:true}},// Compile CSS
{loader:require.resolve('postcss-loader'),options:{ident:'postcss',plugins:()=>[// Make Flexbox behave like the spec cross-browser.
require('postcss-flexbugs-fixes'),// Run Autoprefixer and compile new CSS features.
require('postcss-preset-env')({autoprefixer:{// Disable legacy flexbox support
flexbox:'no-2009'},// Enable CSS features that have shipped to the
// web platform, i.e. in 2+ browsers unflagged.
stage:3})],sourceMap:true}}].filter(Boolean),// A global CSS import always has side effects. Webpack will tree
// shake the CSS without this option if the issuer claims to have
// no side-effects.
// See https://github.com/webpack/webpack/issues/6571
sideEffects:true},{test:/\.css$/,use:isServer?require.resolve('ignore-loader'):{loader:'error-loader',options:{reason:`Global CSS ${_chalk.default.bold('cannot')} be imported from files other than your ${_chalk.default.bold('Custom <App>')}. Please move all global CSS imports to ${_chalk.default.cyan(customAppFile?_path.default.relative(dir,customAppFile):'pages/_app.js')}.\n`+`Read more: https://err.sh/next.js/global-css`}}}]},config.experimental.css&&{loader:require.resolve('file-loader'),issuer:{// file-loader is only used for CSS files, e.g. url() for a SVG
// or font files
test:/\.css$/},// Exclude extensions that webpack handles by default
exclude:[/\.(js|mjs|jsx|ts|tsx)$/,/\.html$/,/\.json$/],options:{name:'static/media/[name].[hash].[ext]'}}].filter(Boolean)},plugins:[// This plugin makes sure `output.filename` is used for entry chunks
new _chunkNamesPlugin.default(),new _webpack.default.DefinePlugin({...Object.keys(config.env).reduce((acc,key)=>{if(/^(?:NODE_.+)|^(?:__.+)$/i.test(key)){throw new Error(`The key "${key}" under "env" in next.config.js is not allowed. https://err.sh/zeit/next.js/env-key-not-allowed`);}return{...acc,[`process.env.${key}`]:JSON.stringify(config.env[key])};},{}),'process.env.NODE_ENV':JSON.stringify(webpackMode),'process.crossOrigin':JSON.stringify(crossOrigin),'process.browser':JSON.stringify(!isServer),'process.env.__NEXT_TEST_MODE':JSON.stringify(process.env.__NEXT_TEST_MODE),// This is used in client/dev-error-overlay/hot-dev-client.js to replace the dist directory
...(dev&&!isServer?{'process.env.__NEXT_DIST_DIR':JSON.stringify(distDir)}:{}),'process.env.__NEXT_EXPORT_TRAILING_SLASH':JSON.stringify(config.exportTrailingSlash),'process.env.__NEXT_DEFER_SCRIPTS':JSON.stringify(config.experimental.deferScripts),'process.env.__NEXT_MODERN_BUILD':JSON.stringify(config.experimental.modern&&!dev),'process.env.__NEXT_GRANULAR_CHUNKS':JSON.stringify(config.experimental.granularChunks&&!dev),'process.env.__NEXT_BUILD_INDICATOR':JSON.stringify(config.devIndicators.buildActivity),'process.env.__NEXT_PRERENDER_INDICATOR':JSON.stringify(config.devIndicators.autoPrerender),'process.env.__NEXT_PLUGINS':JSON.stringify(config.experimental.plugins),'process.env.__NEXT_STRICT_MODE':JSON.stringify(config.reactStrictMode),'process.env.__NEXT_REACT_MODE':JSON.stringify(config.experimental.reactMode),...(isServer?{// Fix bad-actors in the npm ecosystem (e.g. `node-formidable`)
// This is typically found in unmaintained modules from the
// pre-webpack era (common in server-side code)
'global.GENTLY':JSON.stringify(false)}:undefined)}),!isServer&&new _reactLoadablePlugin.ReactLoadablePlugin({filename:_constants2.REACT_LOADABLE_MANIFEST}),!isServer&&new _nextDropClientPagePlugin.DropClientPage(),// Moment.js is an extremely popular library that bundles large locale files
// by default due to how Webpack interprets its code. This is a practical
// solution that requires the user to opt into importing specific locales.
// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
config.future.excludeDefaultMomentLocales&&new _webpack.default.IgnorePlugin(/^\.\/locale$/,/moment$/),...(dev?(()=>{// Even though require.cache is server only we have to clear assets from both compilations
// This is because the client compilation generates the build manifest that's used on the server side
const{NextJsRequireCacheHotReloader}=require('./webpack/plugins/nextjs-require-cache-hot-reloader');const{UnlinkRemovedPagesPlugin}=require('./webpack/plugins/unlink-removed-pages-plugin');const devPlugins=[new UnlinkRemovedPagesPlugin(),new _webpack.default.NoEmitOnErrorsPlugin(),new NextJsRequireCacheHotReloader()];if(!isServer){const AutoDllPlugin=(0,_dllImport.importAutoDllPlugin)({distDir});devPlugins.push(new AutoDllPlugin({filename:'[name]_[hash].js',path:'./static/development/dll',context:dir,entry:{dll:['react','react-dom']},config:{devtool,mode:webpackMode,resolve:resolveConfig}}));devPlugins.push(new _webpack.default.HotModuleReplacementPlugin());}return devPlugins;})():[]),!dev&&new _webpack.default.HashedModuleIdsPlugin(),!dev&&new _webpack.default.IgnorePlugin({checkResource:resource=>{return /react-is/.test(resource);},checkContext:context=>{return /next-server[\\/]dist[\\/]/.test(context)||/next[\\/]dist[\\/]/.test(context);}}),isServerless&&isServer&&new _serverlessPlugin.ServerlessPlugin(),isServer&&new _pagesManifestPlugin.default(isLikeServerless),target==='server'&&isServer&&new _nextjsSsrModuleCache.default({outputPath}),isServer&&new _nextjsSsrImport.default(),!isServer&&new _buildManifestPlugin.default({buildId,clientManifest:config.experimental.granularChunks,modern:config.experimental.modern}),// Extract CSS as CSS file(s) in the client-side production bundle.
config.experimental.css&&!isServer&&!dev&&new _miniCssExtractPlugin.default({filename:'static/css/[contenthash].css',chunkFilename:'static/css/[contenthash].chunk.css'}),tracer&&new _profilingPlugin.ProfilingPlugin({tracer}),!isServer&&useTypeScript&&!ignoreTypeScriptErrors&&new _forkTsCheckerWebpackPlugin.default(_pnpWebpackPlugin.default.forkTsCheckerOptions({typescript:typeScriptPath,async:dev,useTypescriptIncrementalApi:true,checkSyntacticErrors:true,tsconfig:tsConfigPath,reportFiles:['**','!**/__tests__/**','!**/?(*.)(spec|test).*'],compilerOptions:{isolatedModules:true,noEmit:true},silent:true,formatter:'codeframe'})),config.experimental.modern&&!isServer&&!dev&&new _nextEsmPlugin.default({filename:getFileName=>(...args)=>{const name=typeof getFileName==='function'?getFileName(...args):getFileName;return name.includes('.js')?name.replace(/\.js$/,'.module.js'):escapePathVariables(args[0].chunk.name.replace(/\.js$/,'.module.js'));},chunkFilename:inputChunkName=>inputChunkName.replace(/\.js$/,'.module.js')})].filter(Boolean)};if(typeof config.webpack==='function'){webpackConfig=config.webpack(webpackConfig,{dir,dev,isServer,buildId,config,defaultLoaders,totalPages,webpack:_webpack.default});// @ts-ignore: Property 'then' does not exist on type 'Configuration'
if(typeof webpackConfig.then==='function'){console.warn('> Promise returned in next config. https://err.sh/zeit/next.js/promise-in-next-config');}}// check if using @zeit/next-typescript and show warning
if(isServer&&webpackConfig.module&&Array.isArray(webpackConfig.module.rules)){let foundTsRule=false;webpackConfig.module.rules=webpackConfig.module.rules.filter(rule=>{if(!(rule.test instanceof RegExp))return true;if('noop.ts'.match(rule.test)&&!'noop.js'.match(rule.test)){// remove if it matches @zeit/next-typescript
foundTsRule=rule.use===defaultLoaders.babel;return!foundTsRule;}return true;});if(foundTsRule){console.warn('\n@zeit/next-typescript is no longer needed since Next.js has built-in support for TypeScript now. Please remove it from your next.config.js and your .babelrc\n');}}// Patch `@zeit/next-sass`, `@zeit/next-less`, `@zeit/next-stylus` for compatibility
if(webpackConfig.module&&Array.isArray(webpackConfig.module.rules)){;[].forEach.call(webpackConfig.module.rules,function(rule){if(!(rule.test instanceof RegExp&&Array.isArray(rule.use))){return;}const isSass=rule.test.source==='\\.scss$'||rule.test.source==='\\.sass$';const isLess=rule.test.source==='\\.less$';const isCss=rule.test.source==='\\.css$';const isStylus=rule.test.source==='\\.styl$';// Check if the rule we're iterating over applies to Sass, Less, or CSS
if(!(isSass||isLess||isCss||isStylus)){return;};[].forEach.call(rule.use,function(use){if(!(use&&typeof use==='object'&&(// Identify use statements only pertaining to `css-loader`
use.loader==='css-loader'||use.loader==='css-loader/locals')&&use.options&&typeof use.options==='object'&&(// The `minimize` property is a good heuristic that we need to
// perform this hack. The `minimize` property was only valid on
// old `css-loader` versions. Custom setups (that aren't next-sass,
// next-less or next-stylus) likely have the newer version.
// We still handle this gracefully below.
Object.prototype.hasOwnProperty.call(use.options,'minimize')||Object.prototype.hasOwnProperty.call(use.options,'exportOnlyLocals')))){return;}// Try to monkey patch within a try-catch. We shouldn't fail the build
// if we cannot pull this off.
// The user may not even be using the `next-sass` or `next-less` or
// `next-stylus` plugins.
// If it does work, great!
try{// Resolve the version of `@zeit/next-css` as depended on by the Sass,
// Less or Stylus plugin.
const correctNextCss=(0,_resolveRequest.resolveRequest)('@zeit/next-css',isCss?// Resolve `@zeit/next-css` from the base directory
`${dir}/`:// Else, resolve it from the specific plugins
require.resolve(isSass?'@zeit/next-sass':isLess?'@zeit/next-less':isStylus?'@zeit/next-stylus':'next'));// If we found `@zeit/next-css` ...
if(correctNextCss){// ... resolve the version of `css-loader` shipped with that
// package instead of whichever was hoisted highest in your
// `node_modules` tree.
const correctCssLoader=(0,_resolveRequest.resolveRequest)(use.loader,correctNextCss);if(correctCssLoader){// We saved the user from a failed build!
use.loader=correctCssLoader;}}}catch(_){// The error is not required to be handled.
}});});}// Backwards compat for `main.js` entry key
const originalEntry=webpackConfig.entry;if(typeof originalEntry!=='undefined'){webpackConfig.entry=async()=>{const entry=typeof originalEntry==='function'?await originalEntry():originalEntry;// Server compilation doesn't have main.js
if(clientEntries&&entry['main.js']&&entry['main.js'].length>0){const originalFile=clientEntries[_constants2.CLIENT_STATIC_FILES_RUNTIME_MAIN];// @ts-ignore TODO: investigate type error
entry[_constants2.CLIENT_STATIC_FILES_RUNTIME_MAIN]=[...entry['main.js'],originalFile];}delete entry['main.js'];return entry;};}if(!dev){// @ts-ignore entry is always a function
webpackConfig.entry=await webpackConfig.entry();}return webpackConfig;}