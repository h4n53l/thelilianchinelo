import Link from "next/link";

const categories = [
    {name: 'Test category', slug: 'test-slug'},
    {name: 'Test category1', slug: 'test-slug1'}
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
{categories.map((category) => (
    <Link  key={category.slug} href={`/category/${category.slug}`}>
        <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
{category.name}
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