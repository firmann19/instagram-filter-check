import { useState } from "react";
import type { InstagramProfile } from "./types";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    if (!username) return alert("Masukkan username!");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/sprintpedia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Gagal memfetch data");

      const json = await res.json();
      if (!json.data) throw new Error("Data tidak ditemukan");

      setProfile(json.data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
        Instagram Spam Filter Check (Sprintpedia Proxy)
      </h1>

      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          placeholder="Masukkan username Instagram"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
        <button
          onClick={getProfile}
          disabled={loading}
          className="px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition-all shadow-sm"
        >
          {loading ? "Loading..." : "Cari"}
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-4 font-medium bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      {profile && (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transition-all hover:shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.full_name || "-"}
            </h2>
            <p className="text-gray-500">@{profile.username}</p>
          </div>

          <div className="grid grid-cols-3 text-center gap-4 mb-6">
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {profile.follower_count ?? 0}
              </p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {profile.following_count ?? 0}
              </p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {profile.media_count ?? 0}
              </p>
              <p className="text-gray-500 text-sm">Posts</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Status Private</span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  profile.is_private
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {profile.is_private ? "Private ON" : "Private OFF"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Spam Filter</span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  profile.has_spam_filter
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {profile.has_spam_filter ? "Spam Filter ON" : "Spam Filter OFF"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
