import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-full bg-muted p-6">
        <FileQuestion className="h-16 w-16 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-foreground">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        La page que vous recherchez n'existe pas.
      </p>
      <Button asChild className="mt-6">
        <Link to="/dashboard">Retour à l'accueil</Link>
      </Button>
    </div>
  );
};

export default NotFound;
