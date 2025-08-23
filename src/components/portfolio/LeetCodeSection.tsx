import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, Target, Trophy } from "lucide-react";

interface LeetCodeStats {
  username: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyQuestions: number;
  mediumQuestions: number;
  hardQuestions: number;
  acceptanceRate: number;
}

export const LeetCodeSection = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "priyansh"; // Replace with actual username

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
              }
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
            allQuestionsCount {
              difficulty
              count
            }
          }
        `;

        // Using CORS proxy to bypass CORS restrictions
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = encodeURIComponent('https://leetcode.com/graphql');
        
        const response = await fetch(`${proxyUrl}${targetUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { username }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }

        const data = await response.json();
        
        if (data.errors) {
          throw new Error('GraphQL error: ' + data.errors[0].message);
        }

        const user = data.data.matchedUser;
        const allQuestions = data.data.allQuestionsCount;
        
        if (!user) {
          throw new Error('User not found');
        }

        const submitStats = user.submitStats.acSubmissionNum;
        const totalSolved = submitStats.find((s: any) => s.difficulty === "All")?.count || 0;
        const easySolved = submitStats.find((s: any) => s.difficulty === "Easy")?.count || 0;
        const mediumSolved = submitStats.find((s: any) => s.difficulty === "Medium")?.count || 0;
        const hardSolved = submitStats.find((s: any) => s.difficulty === "Hard")?.count || 0;

        const totalQuestions = allQuestions.find((q: any) => q.difficulty === "All")?.count || 0;
        const easyQuestions = allQuestions.find((q: any) => q.difficulty === "Easy")?.count || 0;
        const mediumQuestions = allQuestions.find((q: any) => q.difficulty === "Medium")?.count || 0;
        const hardQuestions = allQuestions.find((q: any) => q.difficulty === "Hard")?.count || 0;

        setStats({
          username: user.username,
          ranking: user.profile.ranking,
          totalSolved,
          easySolved,
          mediumSolved,
          hardSolved,
          totalQuestions,
          easyQuestions,
          mediumQuestions,
          hardQuestions,
          acceptanceRate: totalQuestions > 0 ? (totalSolved / totalQuestions) * 100 : 0
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('LeetCode API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [username]);

  const calculatePercentile = (ranking: number) => {
    // Approximate calculation based on typical LeetCode user base
    const totalUsers = 1000000; // Approximate active users
    return Math.max(1, Math.round((1 - ranking / totalUsers) * 100));
  };

  if (loading) {
    return (
      <section id="leetcode" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              LeetCode <span className="text-gradient">Stats</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="leetcode" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              LeetCode <span className="text-gradient">Stats</span>
            </h2>
          </div>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                Unable to fetch LeetCode stats: {error}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This might be due to CORS restrictions or network issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  const percentile = calculatePercentile(stats.ranking);

  return (
    <section id="leetcode" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            LeetCode <span className="text-gradient">Stats</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Problem-solving achievements and coding practice statistics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="shadow-card hover:shadow-glow transition-smooth group hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{stats.username}</span>
                  <a 
                    href={`https://leetcode.com/${stats.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Top {percentile}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Total Solved */}
          <Card className="shadow-card hover:shadow-glow transition-smooth group hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Total Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.totalSolved}
              </div>
              <div className="text-sm text-muted-foreground">
                of {stats.totalQuestions} problems
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.acceptanceRate.toFixed(1)}% completion
              </div>
            </CardContent>
          </Card>

          {/* Ranking */}
          <Card className="shadow-card hover:shadow-glow transition-smooth group hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Global Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                #{stats.ranking.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Top {percentile}% worldwide
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Breakdown */}
          <Card className="shadow-card hover:shadow-glow transition-smooth group hover:scale-105">
            <CardHeader>
              <CardTitle>Difficulty Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    Easy
                  </Badge>
                  <span className="text-sm font-medium">
                    {stats.easySolved}/{stats.easyQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                    Medium
                  </Badge>
                  <span className="text-sm font-medium">
                    {stats.mediumSolved}/{stats.mediumQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                    Hard
                  </Badge>
                  <span className="text-sm font-medium">
                    {stats.hardSolved}/{stats.hardQuestions}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bars */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Problem Solving Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600 font-medium">Easy Problems</span>
                  <span>{stats.easySolved}/{stats.easyQuestions}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(stats.easySolved / stats.easyQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-yellow-600 font-medium">Medium Problems</span>
                  <span>{stats.mediumSolved}/{stats.mediumQuestions}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(stats.mediumSolved / stats.mediumQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-600 font-medium">Hard Problems</span>
                  <span>{stats.hardSolved}/{stats.hardQuestions}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(stats.hardSolved / stats.hardQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};