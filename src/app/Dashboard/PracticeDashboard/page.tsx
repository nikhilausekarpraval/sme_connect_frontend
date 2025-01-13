// app/practice/page.tsx
import { cookies } from 'next/headers';
import PracticeDashboard from './PracticeDashboardClient/PracticeDashboard';
import GroupService from '@/app/Services/GroupService';
import GroupUserService from '@/app/Services/GroupUsersService';
import { discussions } from '@/app/Constants/Constants';
import { useSearchParams } from 'next/navigation';

interface PracticeDashboardPageProps {
  searchParams: any; 
}

export default async function PracticeDashboardPage({ searchParams }: PracticeDashboardPageProps) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;
  const dataParam = searchParams['data'];

  const decodedData = JSON?.parse(decodeURIComponent(dataParam));
  const title = decodedData?.key?.title;

  if (!authToken) {
    return <div className='flex justify-center items-center text-lg'>Please log in to view this page.</div>; // Redirect if failed
  }

  const groupService = new GroupService(); 
  const userGroupService = new GroupUserService();

  try {

    const userGroupsResponse = await userGroupService.getUserGroups(authToken);

    const allGroupsResponse = await groupService.getUserPracticeGroups(title,authToken);

    const initialGroups = allGroupsResponse?.value?.data || [];
    const initialUserGroups = userGroupsResponse?.value?.data || [];


    return (
      <PracticeDashboard
        initialGroups={initialGroups}
        initialUserGroups={initialUserGroups}
        recentDiscussions={discussions}
        data = {title}
      />
    );
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return <PracticeDashboard initialGroups={[]} initialUserGroups={[]} recentDiscussions={[]} data={[]} />;
  }
}
