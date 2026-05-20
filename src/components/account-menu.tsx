import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { StorePofileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity,
	})

	const { data: managedRestaurant, isLoading: isLoadingRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		staleTime: Infinity,
	})

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex items-center gap-2 select-none">
						{isLoadingRestaurant ? <Skeleton className="h-4 w-40" /> : managedRestaurant?.name}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span className="font-semibold text-foreground">{profile?.name}</span>
								<span className="text-xs forn-normal text-muted-foreground">{profile?.email}</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="w-4 h-4 mr-2" />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
						<LogOut className="w-4 h-4 mr-2" />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StorePofileDialog />
		</Dialog>
	)
}
