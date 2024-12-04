import React, { useState } from "react";
import { Modal, Form, Input, message } from 'antd';
import { createUserApi } from './apis';

interface IProps {
    children: (visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
}

function CreateUserButton(props: IProps): React.ReactNode {

    const [formRef] = Form.useForm();

    const {
        children
    } = props;
    const [visible, setVisible] = useState(false);

    const onSave = () => {
        formRef.validateFields().then(async (values) => {
            console.log(values);
            // setVisible(false);
            const res = await createUserApi<any>(values);
            if (res.code === 200) {
                setVisible(false);
                formRef.resetFields();
                message.success('创建成功');
            } else {
                message.error(res.message);
            }
        })
    }

    const rules = {
        username: [
            {
                required: true,
                message: '请输入用户名',
            },
        ],
        email: [
            {
                required: true,
                message: '请输入邮箱',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
            },
        ],
    }

    return (
        <>
            <Modal
                open={visible}
                onOk={onSave}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <Form
                    layout="vertical"
                    form={formRef}
                >
                    <Form.Item label="用户名" name="username" rules={rules.username}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email" rules={rules.email}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码"  name="password" rules={rules.password}>
                        <Input type="password" />
                    </Form.Item>
                </Form>
            </Modal>
            {children(visible, setVisible)}
        </>
    )
}

export default CreateUserButton;