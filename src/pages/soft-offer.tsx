import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppState } from "@/hooks/use-app-state";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function SoftOffer() {
  const [state, setState] = useAppState();

  const loanPurpose = state?.loanPurpose;

  return (
    <div className="grid gap-4 p-4">
      <h2 className="text-lg font-semibold">Congrats! You are eligible for</h2>

      <Card className="w-full shadow">
        <CardHeader>
          <CardTitle>
            {useMemo(() => {
              switch (loanPurpose) {
                case "home-loan":
                  return "Home Loan";

                case "personal-loan":
                  return "Personal Loan";

                case "education-loan":
                  return "Personal Loan";

                case "vehicle-loan":
                  return "Vehicle Loan";

                default:
                  return "Home Loan";
              }
            }, [loanPurpose])}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(1500000)}
          </p>

          <p className="text-muted-foreground mb-2 text-sm">
            For a tenure of 15 years @12% interest p.a
          </p>

          <p>
            <span className="text-muted-foreground text-sm">EMI: </span>
            <b>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(49250)}
            </b>
            <span className="text-muted-foreground text-sm">/month</span>
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Proceed
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
