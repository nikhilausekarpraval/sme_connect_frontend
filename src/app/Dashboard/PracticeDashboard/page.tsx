// app/practice/page.tsx
import { cookies } from 'next/headers';
import PracticeDashboard from './PracticeDashboardClient/PracticeDashboard';
import GroupService from '@/app/Services/GroupService';
import GroupUserService from '@/app/Services/GroupUsersService';
import DiscussionsService from '@/app/Services/DiscussionService';

interface PracticeDashboardPageProps {
  searchParams: any; 
}

export default async function PracticeDashboardPage({ searchParams }: PracticeDashboardPageProps) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;
  const dataParam = searchParams['data'];
  const refreshToken = searchParams['refresh'];

  const decodedData = JSON?.parse(decodeURIComponent(dataParam));
  const title = decodedData?.key?.title;

  if (!authToken) {
    return <div className='flex justify-center items-center text-lg'>Please log in to view this page.</div>; // Redirect if failed
  }

  const groupService = new GroupService(); 
  const userGroupService = new GroupUserService();
  const discussionService = new DiscussionsService();

  try {

    const userGroupsResponse = await userGroupService.getUserGroups(title,authToken);
    const allGroupsResponse = await groupService.getUserPracticeGroups(title,authToken);
    const recentDiscussions = await discussionService.getRecentDiscussion({practice:title,group:"",discussion:"",description:""},authToken);

    const groups = allGroupsResponse?.value?.data || [];
    const userGroups = userGroupsResponse?.value?.data || [];
    const discussions = recentDiscussions?.value?.data ||  [];

    return (
      <PracticeDashboard
        initialGroups={groups}
        initialUserGroups={userGroups}
        recentDiscussions={discussions}
        data = {title}
      />
    );
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return <PracticeDashboard initialGroups={[]} initialUserGroups={[]} recentDiscussions={[]} data={[]} />;
  }
}
