'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
	const { data: session } = useSession();

	return (
		<div className='nav_header'>
			<div className='flex gap-2 flex-col sm:flex-row'>
				<Link
					className='text-slate-100 hover:text-sky-400'
					href='/'
				>
					Home
				</Link>
			</div>
			<>
				{session ? (
					<div className='flex'>
						<div className='flex gap-3'>
							<Image
								src={session.user.image}
								alt='userimage'
								width={40}
								height={40}
								className='rounded-full object-contain hidden sm:block'
							/>
							<button
								type='button'
								onClick={() => signOut({ callbackUrl: '/' })}
								className='text-slate-100 hover:text-sky-400'
							>
								Sign out
							</button>
						</div>
					</div>
				) : (
					<>
						{
							<p
								className='text-slate-100 hover:text-sky-400'
								onClick={() => signIn({ callbackUrl: '/' })}
							>
								Sign In
							</p>
						}
					</>
				)}
			</>
		</div>
	);
};

export default Navbar;
