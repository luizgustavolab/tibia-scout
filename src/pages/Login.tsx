import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/v0/ui/card';
import { Input } from '../components/v0/ui/input';
import { Button } from '../components/v0/ui/button';
import { Label } from '../components/v0/ui/label';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Entre com suas credenciais do Tibia Scout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Entrar</Button>
          <p className="text-sm text-center">
            Não tem conta?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
