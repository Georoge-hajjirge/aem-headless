import { useEffect, useState } from "react"


const ProfileModel = () => {
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`https://strengtheningly-nonstrategic-ellan.ngrok-free.dev
/content/cq:graphql/TDTraining/endpoint.json`,
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Basic " + btoa("admin:admin"),
                            "ngrok-skip-browser-warning": "true"
                        },
                        body: JSON.stringify({
                            query: `
                                
                            {
  profileList {
    items {
      name
      email
      designation
      biography {
        plaintext
      }
      profilePicture{
        ... on ImageRef{
          _path
        }
      }
    }
  }

                            }
                            `
                        })
                    }

                )
                const data = await res.json();
                console.log(data)
                setProfile(data.data.profileList.items)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">

            {profile.map((user) => (
                <div
                    key={user.email}
                    className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 text-center"
                >

                    <div className="flex justify-center">
                        <img
                            src={`https://strengtheningly-nonstrategic-ellan.ngrok-free.dev${user.profilePicture?._path}`}
                            alt={user.name}
                            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                        />
                    </div>

                    <h2 className="text-3xl font-bold mt-4 text-gray-800">
                        {user.name}
                    </h2>

                    <p className="text-indigo-600 font-semibold text-lg">
                        {user.designation}
                    </p>

                    <p className="text-gray-500 mt-1">{user.email}</p>

                    <div className="border-t my-6"></div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            About
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {user.biography?.plaintext}
                        </p>
                    </div>

                </div>
            ))}

        </div>
    )
}


export default ProfileModel