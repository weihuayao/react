import React from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd';

const  TodoListUi = (props)  =>  {
        return (
            <div style={{ margin: '10px' }}>
            <div>
                <Input 
                    placeholder={props.inputValue}
                    style={{ width: '250px', marginRight: '10px' }}
                    onChange={props.ChangeInputValue}
                    value = {props.inputValue}
                />
                <Button type="primary" onClick={props.handleAddClick}>增加</Button>
            </div>
            <div style={{ margin: '10px', width: '300px' ,}}>
                <List
                    bordered
                    dataSource={props.list}
                    renderItem={(item,index) => ( <List.Item>{item} 
                    <Button onClick = {() => {props.handleDeleteItem(index)}}
                        type="danger"
                        style ={{float:"right" ,width:"60px",textAlign:"center" ,marginTop:"-5px"}}>删除</Button>
                        </List.Item>)} 
                />
            </div>
        </div>
        );
    }


export default TodoListUi;