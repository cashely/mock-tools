import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/common/Logo';
import LocaleButton from '../../components/common/LocaleButton';
import { setTokenToLocalStorage, formFieldValidator } from '../../utils';
import { loginApi } from './api';
import useStore from '../../store';



function Login() {
    const closeLoading = useStore((state) => state.closeLoading);
    const openLoading = useStore((state) => state.openLoading);
    const { t } = useTranslation();

    const rules = {
        username: [
            formFieldValidator<string>(z.string().min(1, t('账号不能为空'))),
        ],
        password: [
            formFieldValidator<string>(z.string().min(1, t('密码不能为空'))),
        ]
    }

    

    const [form] = Form.useForm();

    const navigate = useNavigate();

    /**
     * @name 提交表单
     */

    const onSubmit = async () => {
        try {
            openLoading();
            const values = await form.validateFields();
            const res = await loginApi<string | undefined>(values);
            if (res.code === 200) {
                message.success(t('登录成功'));
                setTokenToLocalStorage(res.data);
                navigate('/');
            } else {
                message.error(res.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            closeLoading();
        }
    }
    return (
        <div className='flex flex-col w-full h-full items-center'>
            <div className='p-2 block text-right w-full xl:w-[1024px]'>
                <LocaleButton />
            </div>
            <div className='flex-1 flex justify-center flex-col'>
                <Logo className='mb-2' />
                <Form
                    layout='vertical'
                    form={form}
                    requiredMark={false}
                    className='border rounded-md shadow-md py-8 px-4 w-[350px]'
                >
                    <Form.Item label={t('账号')} name="username" rules={rules.username}>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label={t('密码')} name="password" rules={rules.password}>
                        <Input className='rounded' type="password" />
                    </Form.Item>
                    <Form.Item className='mb-0'>
                        <Button
                            className='w-full'
                            type='primary'
                            onClick={onSubmit}
                        >
                            {t('登录')}
                        </Button>
                    </Form.Item>
                    <Form.Item className='mb-0 mt-2 text-center'>
                        <Button variant='link' color='primary'>
                            <Link to="/regist">{t('没有账号,马上注册')}</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;