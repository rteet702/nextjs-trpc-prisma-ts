import { trpc } from "../../utils/trpc";

export default function Home() {
    const allUsers = trpc.getAll.useQuery();

    console.log(allUsers?.data);

    if (!allUsers.data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p></p>
        </div>
    );
}
