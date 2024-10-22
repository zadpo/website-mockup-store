// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// interface AuthModalProps {
//   onClose: () => void;
// }

// export function AuthModal({ onClose }: AuthModalProps) {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSignIn) {
//       // Sign in
//       const result = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });
//       if (result?.error) {
//         console.error(result.error);
//       } else {
//         onClose();
//       }
//     } else {
//       // Sign up
//       // Implement your sign up logic here
//       console.log("Sign up with", email, password);
//     }
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{isSignIn ? "Sign In" : "Create Account"}</DialogTitle>
//           <DialogDescription>
//             {isSignIn
//               ? "Sign in to your account to add items to your cart."
//               : "Create an account to start shopping."}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             {isSignIn ? "Sign In" : "Create Account"}
//           </Button>
//         </form>
//         <p className="text-center mt-4">
//           {isSignIn ? "Don't have an account?" : "Already have an account?"}
//           <Button variant="link" onClick={() => setIsSignIn(!isSignIn)} className="ml-2">
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </Button>
//         </p>
//       </DialogContent>
//     </Dialog>
//   );
// }
