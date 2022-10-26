import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";

export default function Home() {
    const allUsers = trpc.getAllUsers.useQuery();
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const userMutate = trpc.createUser.useMutation({});

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = formState;

        userMutate.mutate({
            firstName,
            lastName,
            email,
            password,
        });
    };

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormState({ ...formState, [target.name]: target.value });
    };

    useEffect(() => {
        console.log(formState);
    }, [formState]);

    if (!allUsers.data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="flex flex-col w-[500px] gap-4 mx-auto bg-neutral-800 p-4 shadow-lg"
            >
                <input
                    type="text"
                    className="bg-neutral-700"
                    name="firstName"
                    onChange={changeHandler}
                    value={formState.firstName}
                />
                <input
                    type="text"
                    className="bg-neutral-700"
                    name="lastName"
                    onChange={changeHandler}
                    value={formState.lastName}
                />
                <input
                    type="text"
                    className="bg-neutral-700"
                    name="email"
                    onChange={changeHandler}
                    value={formState.email}
                />
                <input
                    type="text"
                    className="bg-neutral-700"
                    name="password"
                    onChange={changeHandler}
                    value={formState.password}
                />
                <button type="submit" className="bg-purple-900">
                    Submit
                </button>
            </form>
            <div>
                {allUsers.data.users.map((user, index: number) => {
                    return <div key={index}>{user.firstName}</div>;
                })}
            </div>
        </div>
    );
}
