import Link from "next/link";

const headerLinks:Array<{name:string, slug:string}> = [
    {name: 'Blog', slug: '/'},
    {name: 'Announcements', slug: 'announcements'}
]

const Header = () => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
<div className="md:float-left block">
<Link href="/">
<span className="cursor-pointer font-bold text-4xl text-white">
    Lilian
</span>
</Link>
</div>
<div className="md:float-left hidden md:contents">
{headerLinks.map((link) => (
    <Link  key={link.slug} href={link.slug}>
        <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
{link.name}
        </span>
    </Link>
)
)}
</div>
                </div>
        </div>
    );
}

export default Header;