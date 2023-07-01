export const metadata = {
	title: 'NextJS 13 next auth를 사용하여 로그인하기',
	description:
		'nextjs 13에서 next auth를 사용하여 구글, 네이버, 카카오로 로그인 하기. 사용자 정보는 몽고DB에 저장 혹은 불러오기를 함',
};

export default function Home() {
	return (
		<main className='feed text-blue-900 font-bold'>
			<h1>Next JS 13 로그인</h1>
			<p>next auth, 구글, 네이버, 카카오, 몽고 DB를 사용함</p>
		</main>
	);
}
