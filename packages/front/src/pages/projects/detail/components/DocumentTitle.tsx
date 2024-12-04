import React, { useState, useRef } from 'react';
import { Input, Spin, Popconfirm } from 'antd';
import cs from 'classnames';
import { AiOutlineDelete } from "react-icons/ai";
import { LoadingOutlined } from '@ant-design/icons';

interface IProps {
    title?: string,
    method?: string,
    onClick?: React.MouseEventHandler,
    onDelete?: (e?: React.MouseEvent<HTMLElement>) => void,
    onBlur?: (title: string) => Promise<void>,
    className?: string,
}

function DocumentTitle(props: IProps) {
    const { title, method } = props;

    const inputRef = useRef(null);

    const [hover] = useState(true);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<any>('');
    const [editMode, setEditMode] = useState(false);

    /**
     * @name 双击进入编辑模式
     */

    const onDoubleClick = () => {
        setValue(title);
        setEditMode(true);
        setTimeout(() => {
            inputRef.current && (inputRef.current as HTMLInputElement).focus();
        }, 100)
    }

    /**
     * @name 失去焦点
     */

    const onBlur = async () => {
        if (title === value) {
            setEditMode(false);
            return;
        }
        setLoading(true);
        props.onBlur && await props.onBlur(value);
        setEditMode(false);
        setLoading(false);
    }

    return (
        <>
            {
                editMode ? (
                    <Input
                        ref={inputRef}
                        size='small'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={onBlur}
                        suffix={loading ? <Spin indicator={<LoadingOutlined spin />} /> : null}
                        className='border-none focus:shadow-none focus:border-none bg-gray-200 hover:bg-gray-200 focus:bg-gray-200 rounded-sm text-sm px-2 py-1'
                    />
                ) : (
                    <div
                        className='flex items-center justify-between w-full'
                    >
                        <span className='rounded p-0.5 bg-green-500 text-white mr-1 leading-none'>{String.prototype.toUpperCase.call(method)}</span>
                        <span className={cs(props.className, 'flex-1')} onDoubleClick={onDoubleClick} onClick={props.onClick}>{title}</span>
                        {
                            hover && (
                                <div
                                    className='ml-2 '
                                    onMouseEnter={(e) => e.stopPropagation()}
                                >
                                    <Popconfirm
                                        title='删除'
                                        placement='topRight'
                                        okText='确定'
                                        cancelText='取消'
                                        onConfirm={props.onDelete}
                                        
                                    >
                                        <span className='text-[16px] text-gray-500'>
                                            <AiOutlineDelete />
                                        </span>
                                    </Popconfirm>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}

export default DocumentTitle;