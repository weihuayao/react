"use strict";exports.__esModule=true;exports.default=void 0;var _path=require("path");var _querystring=require("querystring");var _constants=require("../../../next-server/lib/constants");var _utils=require("../../../next-server/lib/router/utils");var _constants2=require("../../../lib/constants");const nextServerlessLoader=function(){const{distDir,absolutePagePath,page,buildId,canonicalBase,assetPrefix,ampBindInitData,absoluteAppPath,absoluteDocumentPath,absoluteErrorPath,generateEtags}=typeof this.query==='string'?(0,_querystring.parse)(this.query.substr(1)):this.query;const buildManifest=(0,_path.join)(distDir,_constants.BUILD_MANIFEST).replace(/\\/g,'/');const reactLoadableManifest=(0,_path.join)(distDir,_constants.REACT_LOADABLE_MANIFEST).replace(/\\/g,'/');const escapedBuildId=buildId.replace(/[|\\{}()[\]^$+*?.-]/g,'\\$&');if(page.match(_constants2.API_ROUTE)){return`
    ${(0,_utils.isDynamicRoute)(page)?`
      import { getRouteMatcher } from 'next/dist/next-server/lib/router/utils/route-matcher';
      import { getRouteRegex } from 'next/dist/next-server/lib/router/utils/route-regex';
      `:``}
      import { parse } from 'url'
      import { apiResolver } from 'next/dist/next-server/server/api-utils'
      import initServer from 'next-plugin-loader?middleware=on-init-server!'
      import onError from 'next-plugin-loader?middleware=on-error-server!'

      export default async (req, res) => {
        try {
          await initServer()
          const params = ${(0,_utils.isDynamicRoute)(page)?`getRouteMatcher(getRouteRegex('${page}'))(parse(req.url).pathname)`:`{}`}
          const resolver = require('${absolutePagePath}')
          apiResolver(req, res, params, resolver, onError)
        } catch (err) {
          console.error(err)
          await onError(err)
          res.statusCode = 500
          res.end('Internal Server Error')
        }
      }
    `;}else{return`
    import {parse} from 'url'
    import {parse as parseQs} from 'querystring'
    import {renderToHTML} from 'next/dist/next-server/server/render';
    import {sendHTML} from 'next/dist/next-server/server/send-html';
    import initServer from 'next-plugin-loader?middleware=on-init-server!'
    import onError from 'next-plugin-loader?middleware=on-error-server!'
    ${(0,_utils.isDynamicRoute)(page)?`import {getRouteMatcher, getRouteRegex} from 'next/dist/next-server/lib/router/utils';`:''}
    import buildManifest from '${buildManifest}';
    import reactLoadableManifest from '${reactLoadableManifest}';
    import Document from '${absoluteDocumentPath}';
    import Error from '${absoluteErrorPath}';
    import App from '${absoluteAppPath}';
    import * as ComponentInfo from '${absolutePagePath}';
    const Component = ComponentInfo.default
    export default Component
    export const unstable_getStaticProps = ComponentInfo['unstable_getStaticProp' + 's']
    ${(0,_utils.isDynamicRoute)(page)?"export const unstable_getStaticParams = ComponentInfo['unstable_getStaticParam' + 's']":''}
    export const config = ComponentInfo['confi' + 'g'] || {}
    export const _app = App
    export async function renderReqToHTML(req, res, fromExport) {
      const options = {
        App,
        Document,
        buildManifest,
        unstable_getStaticProps,
        reactLoadableManifest,
        canonicalBase: "${canonicalBase}",
        buildId: "${buildId}",
        assetPrefix: "${assetPrefix}",
        ampBindInitData: ${ampBindInitData===true||ampBindInitData==='true'},
      }
      let sprData = false

      if (req.url.match(/_next\\/data/)) {
        sprData = true
        req.url = req.url
          .replace(new RegExp('/_next/data/${escapedBuildId}/'), '/')
          .replace(/\\.json$/, '')
      }
      const parsedUrl = parse(req.url, true)
      const renderOpts = Object.assign(
        {
          Component,
          pageConfig: config,
          dataOnly: req.headers && (req.headers.accept || '').indexOf('application/amp.bind+json') !== -1,
          nextExport: fromExport
        },
        options,
      )
      try {
        ${page==='/_error'?`res.statusCode = 404`:''}
        ${(0,_utils.isDynamicRoute)(page)?`const params = fromExport && !unstable_getStaticProps ? {} : getRouteMatcher(getRouteRegex("${page}"))(parsedUrl.pathname) || {};`:`const params = {};`}
        ${// Temporary work around: `x-now-route-matches` is a platform header
// _only_ set for `Prerender` requests. We should move this logic
// into our builder to ensure we're decoupled. However, this entails
// removing reliance on `req.url` and using `req.query` instead
// (which is needed for "custom routes" anyway).
(0,_utils.isDynamicRoute)(page)?`const nowParams = req.headers && req.headers["x-now-route-matches"]
              ? getRouteMatcher(
                  (function() {
                    const { re, groups } = getRouteRegex("${page}");
                    return {
                      re: {
                        // Simulate a RegExp match from the \`req.url\` input
                        exec: str => {
                          const obj = parseQs(str);
                          return Object.keys(obj).reduce(
                            (prev, key) =>
                              Object.assign(prev, {
                                [key]: encodeURIComponent(obj[key])
                              }),
                            {}
                          );
                        }
                      },
                      groups
                    };
                  })()
                )(req.headers["x-now-route-matches"])
              : null;
          `:`const nowParams = null;`}
        let result = await renderToHTML(req, res, "${page}", Object.assign({}, unstable_getStaticProps ? {} : parsedUrl.query, nowParams ? nowParams : params, sprData ? { _nextSprData: '1' } : {}), renderOpts)

        if (sprData && !fromExport) {
          const payload = JSON.stringify(renderOpts.sprData)
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Content-Length', Buffer.byteLength(payload))
          res.setHeader(
            'Cache-Control',
            \`s-maxage=\${renderOpts.revalidate}, stale-while-revalidate\`
          )
          res.end(payload)
          return null
        }

        if (fromExport) return { html: result, renderOpts }
        return result
      } catch (err) {
        if (err.code === 'ENOENT') {
          res.statusCode = 404
          const result = await renderToHTML(req, res, "/_error", parsedUrl.query, Object.assign({}, options, {
            Component: Error
          }))
          return result
        } else {
          console.error(err)
          res.statusCode = 500
          const result = await renderToHTML(req, res, "/_error", parsedUrl.query, Object.assign({}, options, {
            Component: Error,
            err
          }))
          return result
        }
      }
    }
    export async function render (req, res) {
      try {
        await initServer()
        const html = await renderReqToHTML(req, res)
        if (html) {
          sendHTML(req, res, html, {generateEtags: ${generateEtags}})
        }
      } catch(err) {
        await onError(err)
        console.error(err)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    }
  `;}};var _default=nextServerlessLoader;exports.default=_default;