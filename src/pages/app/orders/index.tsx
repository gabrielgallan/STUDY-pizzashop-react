import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";

export function Orders() {
    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            </div>
            <div className="space-y-2.5">
                <OrderTableFilters />

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16"></TableHead>
                                <TableHead className="w-42">Identificador</TableHead>
                                <TableHead className="w-40">Realizado há</TableHead>
                                <TableHead className="w-40">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-38">Total de pedidos</TableHead>
                                <TableHead className="w-41"></TableHead>
                                <TableHead className="w-33"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 10 }).map((_, i) => {
                                return <OrderTableRow key={i} />
                            })}
                        </TableBody>
                    </Table>
                </div>

                <Pagination pageIndex={0} totalCount={105} perPage={10} />
            </div>
        </>
    )
}