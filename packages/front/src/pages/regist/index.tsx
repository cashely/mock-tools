import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useTranslation } from'react-i18next';
import LocaleButton from '../../components/common/LocaleButton';
import { formFieldValidator } from '../../utils';
import { regiestApi } from './api';
import useStore from '../../store';



function Regist() {

    const closeLoading = useStore((state) => state.closeLoading);
    const openLoading = useStore((state) => state.openLoading);

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const { t } = useTranslation();

    const [messageHandle, messageHolder] = message.useMessage();

    /**
     * @name 提交表单
     */

    const rules = {
        username: [
            formFieldValidator<string>(z.string().min(2, t('账号不能为空'))),
        ],
        email: [
            formFieldValidator<string>(z.string().min(1, t('邮箱不能为空')).email(t('邮箱格式不正确'))),
        ],
        password: [
            formFieldValidator<string>(z.string().min(1, t('密码不能为空'))),
        ]
    }

    const onSubmit = async () => {
        try {
            openLoading();
            const values = await form.validateFields();
            const res = await regiestApi<any>(values);
            if (res.code === 200) {
                messageHandle.success(<div>注册成功,即将返回登录<Button variant='link' color='primary'><Link to="/login" className='ml-2'>立即登录</Link></Button></div>, 3);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            closeLoading();
        }
    }
    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            {messageHolder}
            <div className='p-2 block text-right w-full xl:w-[1024px]'>
                <LocaleButton />
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <Form
                    layout='vertical'
                    form={form}
                    className='border rounded-lg shadow-md py-8 px-4 w-[400px]'
                >
                    <Form.Item label={t("账号")} name="username" rules={rules.username}>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label={t("邮箱")} name="email" rules={rules.email}>
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item label={t("密码")} name="password" rules={rules.password}>
                    <Input className='rounded' type='password' />
                    </Form.Item>
                    <Form.Item label={t("邀请码")} name="inviteCode">
                        <Input className='rounded' />
                    </Form.Item>
                    <Form.Item className='mb-0'>
                        <Button
                            className='w-full'
                            type='primary'
                            onClick={onSubmit}
                        >
                            {t('注册')}
                        </Button>
                    </Form.Item>
                    <Form.Item className='text-center mb-0 mt-2'>
                        <Button variant='link' color='primary'>
                            <Link to="/login">{t('已有账号,立即登录')}</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Regist;