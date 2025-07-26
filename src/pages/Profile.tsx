import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const Profile = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <section className="pt-24 pb-12 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
                    <CardContent className="flex pt-8">
                        <div>
                            <Avatar className="h-48 w-48 m-16">
                                <AvatarImage src="" alt="John Doe" />
                                <AvatarFallback className="bg-primary text-8xl text-primary-foreground">
                                JD
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        

                        <div className="space-y-4 flex-1 mr-8">
                            <h1 className="text-xl">First Name</h1>
                            <Input
                                placeholder="John"
                                className="text-xl"
                            />
                            <h2 className="text-xl">Last Name</h2>
                            <Input
                                placeholder="Doe"
                                className="text-xl"
                            />
                            <h3 className="text-xl">Email</h3>
                            <Input
                                placeholder="john.doe@example.com"
                                className="text-xl"
                            />
                            <Button
                                size="sm"
                                onClick={() => {}}
                            >
                                Save
                            </Button>
                        </div>
                        
                    </CardContent>
                </Card>
            </section>
            
        </div>
    );
}

export default Profile;