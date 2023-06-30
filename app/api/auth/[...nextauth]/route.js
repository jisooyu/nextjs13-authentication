import NextAuth from 'next-auth/next';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		NaverProvider({
			clientId: process.env.NAVER_CLIENT_ID,
			clientSecret: process.env.NAVER_CLIENT_SECRET,
		}),
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID,
			clientSecret: process.env.KAKAO_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email,
			});
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			// naver의 경우
			let newProfile = profile.response ? profile.response : profile;
			// 카카오의 경우
			if (profile.kakao_account) {
				newProfile.email = profile.kakao_account.email;
				newProfile.name = profile.kakao_account.profile.nickname;
				newProfile.picture = profile.kakao_account.profile.profile_image_url;
			}
			try {
				await connectToDB();
				const userExists = await User.findOne({
					email: newProfile.email,
				});
				if (!userExists) {
					await User.create({
						email: newProfile.email,
						username: newProfile.name,
						image: newProfile.picture || newProfile.profile_image,
					});
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
