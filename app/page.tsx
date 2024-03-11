import Hero from '@/components/Hero';
import { ScrollProvider } from '@/components/Providers/ScrollProvider';
import SectionContainer from '@/components/SectionContainer';
import TopTracks from '@/components/Spotify/TopTracks';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default function Page() {
    return (
        // <ScrollProvider>
        //   <Hero />
        //   <SectionContainer>
        //     <Suspense fallback="loading..">
        //       <TopTracks />
        //     </Suspense>
        //   </SectionContainer>
        // </ScrollProvider>
        redirect('/blog')
    );
}
