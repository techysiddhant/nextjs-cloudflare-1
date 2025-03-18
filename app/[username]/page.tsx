// export const runtime = 'edge';
export const revalidate = 60; // ISR: Rebuild the page every 60 seconds
export const dynamicParams = true; // Enable ISR for users beyond the pre-generated ones

// Function to generate static paths for the first 25 users
export async function generateStaticParams() {
    const users = Array.from({ length: 25 }, (_, i) => i + 1); // IDs 1 to 25
    return users.map((id) => ({
        username: id.toString(),
    }));
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const user: { id: number; name: string; username: string; email: string } = await fetch(`https://jsonplaceholder.typicode.com/users/${username}`).then(
        (res) => res.json()
    );

    if (!user.id) {
        return <h1>User Not Found</h1>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}
