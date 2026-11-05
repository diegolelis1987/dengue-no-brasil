
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRound, UserPlus, Edit, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UsersPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    },
    // Podemos adicionar alguns usuários fictícios para demonstração
    {
      id: '2',
      name: 'João Silva',
      email: 'joao@example.com',
      role: 'agente',
    },
    {
      id: '3',
      name: 'Maria Santos',
      email: 'maria@example.com',
      role: 'supervisor',
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Formulário para novo usuário
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agente'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEditing && editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value
      });
    }
  };
  
  const handleRoleChange = (value: string) => {
    if (isEditing && editingUser) {
      setEditingUser({
        ...editingUser,
        role: value
      });
    } else {
      setNewUser({
        ...newUser,
        role: value
      });
    }
  };
  
  const handleCreateUser = () => {
    // Validação básica
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    // Em um caso real, enviaríamos para a API
    const createdUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    
    setUsers([...users, createdUser]);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'agente'
    });
    setIsCreating(false);
    
    toast({
      title: "Sucesso",
      description: "Usuário criado com sucesso",
      variant: "default"
    });
  };
  
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
  };
  
  const handleUpdateUser = () => {
    if (!editingUser) return;
    
    // Validação básica
    if (!editingUser.name || !editingUser.email) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    // Atualiza o usuário na lista
    const updatedUsers = users.map(u => 
      u.id === editingUser.id ? editingUser : u
    );
    
    setUsers(updatedUsers);
    setIsEditing(false);
    setEditingUser(null);
    
    toast({
      title: "Sucesso",
      description: "Usuário atualizado com sucesso",
      variant: "default"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-health-900">Gerenciamento de Usuários</h1>
          <p className="text-health-600">Gerencie os usuários do sistema</p>
        </div>
        
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-health-700 hover:bg-health-800">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Usuário</DialogTitle>
              <DialogDescription>
                Preencha as informações para criar um novo usuário no sistema.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Nome completo"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Senha segura"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Tipo de Usuário</Label>
                <Select value={newUser.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="agente">Agente de Campo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancelar</Button>
              <Button className="bg-health-700 hover:bg-health-800" onClick={handleCreateUser}>
                <UserCheck className="mr-2 h-4 w-4" />
                Criar Usuário
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Atualize as informações do usuário.
              </DialogDescription>
            </DialogHeader>
            
            {editingUser && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editingUser.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={editingUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Tipo de Usuário</Label>
                  <Select value={editingUser.role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="agente">Agente de Campo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setEditingUser(null);
              }}>
                Cancelar
              </Button>
              <Button className="bg-health-700 hover:bg-health-800" onClick={handleUpdateUser}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-health-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-health-900">Lista de Usuários</CardTitle>
          <CardDescription>
            Usuários registrados no sistema de monitoramento de focos de dengue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      u.role === "admin" 
                        ? "bg-health-600/20 text-health-800" 
                        : u.role === "supervisor"
                        ? "bg-health-500/20 text-health-700"
                        : "bg-health-400/20 text-health-600"
                    }`}>
                      {u.role === "admin" 
                        ? "Administrador" 
                        : u.role === "supervisor" 
                        ? "Supervisor" 
                        : "Agente de Campo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditUser(u)}
                    >
                      <Edit className="h-4 w-4 text-health-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t border-health-100 py-3 px-6 text-sm text-health-600">
          Total de {users.length} usuários cadastrados
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersPage;
