
import logo from '@/../public/assets/logo.jpg'
import Container from '@/components/common/Container'

const Navbar = () => {
    return (
        <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
            <div className='flex items-center justify-between px-6'>
                <div className="flex items-center justify-between">
                    <div><img className='h-12 w-12 rounded-full border border-gray-200 bg-blue-300 transition-all duration-300 ease-in-out hover:scale-90 dark:bg-yellow-300' src={logo.src} alt="" /></div>
                    <div>
                        <ul className='flex gap-3 p-4'>
                            <li>Work</li>
                            <li>Blogs</li>
                            <li>Projects</li>
                        </ul>
                    </div>
                </div>
                <div className='bg-red-600 rounded-full h-12 w-12'>

                </div>
            </div>
        </Container>

    )
}

export default Navbar