import logoImage from '../../assets/logo.png';

interface IProps {
    width?: number;
    height?: number;
    className?: string;
    fontSize?: number;
}


function Logo(props: IProps) {

    const { width = 100, className = '', fontSize = 60 } = props;

    return (
        <div className={className}>
            <div className="logo flex items-baseline">
                <img src={logoImage} className={`block`} style={{ width }} alt="logo" />
                <div className={`flex items-baseline`} style={{ fontSize: `${fontSize}px`, transform: `translate3d(0, ${fontSize * -0.2}px, 0)`}}>
                    <span className={`text-[#ff66a6] block transform-gpu`} style={{ fontSize: `${fontSize}px`}}>J</span><span className='text-[#00e1b8]'>m</span><span className='text-[#c696da]'>ocker</span>
                </div>
            </div>
        </div>
    )
}

export default Logo;