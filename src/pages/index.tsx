import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const allUsers = trpc.getAllUsers.useQuery();
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const userMutate = trpc.createUser.useMutation({});
    const userDelete = trpc.deleteUser.useMutation({});

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = formState;

        const user = await userMutate.mutate({
            firstName,
            lastName,
            email,
            password,
        });

        setTimeout(() => {
            allUsers.refetch();
            setFormState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            });
        }, 250);
    };

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormState({ ...formState, [target.name]: target.value });
    };

    if (!allUsers.data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form
                className="flex flex-col w-[500px] gap-4 mx-auto bg-neutral-800 p-4 shadow-lg my-8"
                onSubmit={submitHandler}
            >
                <h2 className="border-b border-neutral-500 pb-2">
                    Create a user
                </h2>
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
                    return (
                        <div
                            key={index}
                            className="w-[500px] mx-auto my-8 shadow-lg"
                        >
                            <div className="bg-neutral-700 px-4 py-2 flex justify-between">
                                <p>
                                    {user.firstName} {user.lastName}
                                </p>
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        userDelete.mutate({ id: user.id });
                                        setTimeout(() => {
                                            allUsers.refetch();
                                        }, 600);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="bg-neutral-800 p-4">{user.email}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
