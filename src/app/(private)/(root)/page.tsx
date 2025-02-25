import { Download, Edit2, Eye, Plus } from 'lucide-react';
import Image from 'next/image';

import { auth } from '@/auth';

import { getResumesByUserId } from './db/get-resumes-by-user';

const Home = async () => {
	const session = await auth();
	const userId = session!.user.id;

	const resumes = await getResumesByUserId(userId);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Resumes</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<div className="relative group">
					{/* <Image src={image.src || "/placeholder.svg"} alt={image.alt} width={300} height={300} className="w-full h-auto rounded-lg" /> */}
					<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
						<button className="p-2 bg-white rounded-full mr-2 hover:bg-gray-200 transition-colors duration-300">
							<Plus className="w-6 h-6 text-gray-800" />
						</button>
					</div>
				</div>
				{resumes.map((image) => (
					<div key={image.id} className="relative group">
						{/* <Image src={image.src || "/placeholder.svg"} alt={image.alt} width={300} height={300} className="w-full h-auto rounded-lg" /> */}
						<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
							<button className="p-2 bg-white rounded-full mr-2 hover:bg-gray-200 transition-colors duration-300">
								<Download className="w-6 h-6 text-gray-800" />
							</button>
							<button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors duration-300">
								<Edit2 className="w-6 h-6 text-gray-800" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
