import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Button, Input, List, Checkbox } from "antd"

const { Content } = Layout

class IndexPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.dispatch = props.dispatch;
    this.state = {
      item: '',
    };
  }

  render() {
    const props = this.props;
    return (
      <Layout className={styles.layout}>
        <h1>TodoList
            <small>(Dva + antd)</small>
        </h1>
        <Content>
          <Input placeholder="输入代办事项"
            value={this.state.item}
            onChange={(event) => {this.setState({
              item:event.target.value})
            }} />
          <Button
            type="primary"
            icon="plus"
            onClick={() => {
              props.dispatch({ 
                type: 'example/add', 
                item: { name: this.state.item, status: false } });
              this.setState({ item: '' });
            }}
          >添加</Button>
        <List
          className={styles.list}
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox
                className={(item.status ? styles.check : "l")}
                checked={item.status}
                onClick = {(event ) =>{
                  props.dispatch({type:"example/check", index ,value:event.target.checked})
                }}
                >{item.name}</Checkbox>
              <Button
                className={styles.btnDelete}
                type="danger"
                size="small"
                shape="circle"
                icon="cross"
                onClick = {() =>(
                  props.dispatch({type:"example/delete", index }) 
                )}
              />
            </List.Item>
          )} />
        </Content>
      </Layout >
    );
  }
}
function mapStateToProps(state) {
  return {
    list: state.example.list
  };
}

export default connect(mapStateToProps)(IndexPage);
