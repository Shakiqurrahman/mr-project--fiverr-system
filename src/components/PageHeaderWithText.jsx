import Image from '../assets/images/Page Title Backround.jpg';
function PageHeader({ bgImage, color, title, text }) {
    return (
        <div
            className="h-[250px] lg:h-[300px] xl:h-[400px] bg-cover flex flex-col items-center justify-center  bg-[100%] "
            style={{ backgroundImage: `url(${bgImage ? bgImage : Image})` }}
        >
            <h1
                className={`text-lg sm:text-xl md:text-3xl font-semibold ${
                    color ? color : 'text-primary'
                }`}
            >
                {title}
            </h1>
            {text}
        </div>
    );
}

export default PageHeader;
