import { Link } from 'react-router-dom'
import Divider from '../Divider'

function Copyright() {
    return (
        <div className='flex items-center py-5 justify-between flex-wrap md:flex-nowrap text-center md:text-start gap-y-3 md:gap-y-0'>
            <div className='flex items-center justify-center md:justify-start gap-3 w-full md:w-1/2'>
                <Link to={"/termsandconditions"} className='hover:text-primary duration-300'>Terms and Conditions</Link>
                <Divider className="h-[20px] w-[1px]" />
                <Link to={"/privacypolicy"} className='hover:text-primary duration-300'>Privacy Policy</Link>
            </div>
            <p className='w-full md:w-1/2 md:text-end'>&copy; 2024 Muhfujurrahm535 LTD. All Rights Reserved.</p>
        </div>
    )
}

export default Copyright