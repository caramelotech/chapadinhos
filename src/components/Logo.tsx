import Link from "next/link";

const Logo = () => {
	return (
		<Link href="/" className="flex items-center font-display">
			<span className="text-xl font-bold tracking-tight text-on-surface">
				chapa
			</span>
			<span className="text-xl font-bold tracking-tight text-primary-lime">
				.
			</span>
		</Link>
	);
};

export default Logo;
