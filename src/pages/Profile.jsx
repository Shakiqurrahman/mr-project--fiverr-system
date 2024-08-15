import defaultImg from "../assets/images/default_user.png";
function Profile() {
    return (
        <section className="my-20 max-w-[500px] flex flex-col items-center mx-auto rounded-2xl p-10 border shadow-xl">
            <div className="rounded-full border overflow-hidden w-32">
            <img className="w-full" src={defaultImg} alt="user image" />
            </div>
            <h2 className="mt-2 text-xl font-semibold ">John Doe</h2>
            <p className="text-sm mb-1 text-primary">San Francisco, California</p>
            <p className="text-[15px] font-medium">Email : test@gmail.com</p>
        </section>
    );
}

export default Profile;
