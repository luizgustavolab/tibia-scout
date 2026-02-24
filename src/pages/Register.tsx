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

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>
            Cadastre-se para começar a trackear.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Seu nome" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Registrar</Button>
          <p className="text-sm text-center">
            Já tem conta?{' '}
            <Link
              title="Login"
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Faça login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
