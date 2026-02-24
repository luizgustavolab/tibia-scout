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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Personagens Monitorados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Alertas Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Última Verificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Há 2 min</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
