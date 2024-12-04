import { Button, Upload, Modal, Collapse, message } from 'antd';
import { useState } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import Editor from '../editor';
import request from '../../utils/request';

interface Iprops {
    onSuccess?: (result: any) => void;
    projectId: number;
    children?: any;
}

function UploadButton(props: Iprops) {

    const { onSuccess, children, projectId } = props;

    // 弹窗是否可见
    const [visible, setVisible] = useState(false);

    // 上传以后返回的文档列表
    const [documents, setDocuments] = useState<any[]>([]);

    // 折叠面板展开的keys
    const [_, setActiveKeys] = useState<string[]>([]);

    const [fileList, setFileList] = useState<any[]>([]);

    const onBeforeUpload = (file: any) => {
        setFileList([...fileList, file]);
        onUpload([...fileList, file]);
        return false;
    }

    const onUpload = async (fileList: any) => {
        const formData = new FormData();
        fileList.forEach((file: File) => {
            formData.append('files', file);
        });
        const res: any = await request.post('/upload/swagger', formData,
        );
        if (res.code === 200) {
            setVisible(true);
            setDocuments(res.data);
        }
    }

    /**
     * @name onCollapseChange 折叠面板变化时
     * @param key 
     */
    const onCollapseChange = (keys: string[]) => {
        setActiveKeys(keys);
    }

    /**
     * @name onSaveBulk 保存
     */
    const onSaveBulk = async () => {
        const res: any = await request.post('/document/import/swagger', {
            projectId,
            documents: documents.map((item: any) => {
                return {
                    path: item.path,
                    method: item.method,
                    content: item.content,
                    description: item.description,
                }
            })
        });
        if (res.code === 200) {
            message.success('保存成功');
            setVisible(false);
            onSuccess && onSuccess(res);
        }
    }

    return (
        <>
            <Upload
                listType='picture'
                accept='.json'
                fileList={fileList}
                showUploadList={false}
                beforeUpload={onBeforeUpload}
            >
                {
                    children
                    ?
                    children
                    :
                    <Button variant='link' color='default' icon={<CloudUploadOutlined />} title="导入swagger文档" />
                }
            </Upload>
            <Modal
                width={'80%'}
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={onSaveBulk}
            >
                <Collapse
                    items={
                        documents.map((item: any) => {
                            return {
                                key: `${item.path}_${item.method}`,
                                label: item.path,
                                children: <div className='h-[200px]'><Editor value={item.content} /></div>,
                            }
                        })
                    }
                    onChange={onCollapseChange}
                />
            </Modal>
        </>
    )
}

export default UploadButton;