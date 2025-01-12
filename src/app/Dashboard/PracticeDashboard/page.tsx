// File: /app/practice/page.tsx
import GroupService from '@/app/Services/GroupService';
import GroupUserService from '@/app/Services/GroupUsersService';
import { discussions } from '@/app/Constants/Constants';
import PracticeDashboard from '../PracticeDashboardClient/PracticeDashboard'; // Client component

export default async function PracticeDashboardPage() {
    try {
        const groupService = new GroupService();
        const userGroupService = new GroupUserService();

        const allGroupsResponse = await groupService.getGroups();
        const userGroupsResponse = await userGroupService.getUserGroups();

        const initialGroups = allGroupsResponse.value.data || [];
        const initialUserGroups = userGroupsResponse.value.data || {};
        const practiceTitle = 'Your Practice Name'; // Replace with dynamic logic if needed

        return (
            <PracticeDashboard
                initialGroups={initialGroups}
                initialUserGroups={initialUserGroups}
                recentDiscussions={discussions}
                practiceTitle={practiceTitle}
            />
        );
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return (
            <PracticeDashboard
                initialGroups={[]}
                initialUserGroups={[]}
                recentDiscussions={[]}
                practiceTitle="Error"
            />
        );
    }
}
