import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { SidebarTripComponent } from "../../componentes/sidebar-trip/sidebar-trip.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../../service/budget/budget.service';
import { CategoriaGastoModel } from '../../models/categoriaGastoModel';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GastoModel } from '../../models/gastoModel';
import localePt from '@angular/common/locales/pt';
import { SaldoModel } from '../../models/saldoModel';

registerLocaleData(localePt);
@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarTripComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }] 
})
export class BudgetComponent implements OnInit {


  despesaForm!: FormGroup
  categorias: CategoriaGastoModel[] = []
  despesas: GastoModel[] = []
  viagemId: string = ''
  saldo!: SaldoModel

  constructor(private budgetService: BudgetService, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.viagemId = this.route.snapshot.paramMap.get('id') ?? ''
    this.getCategory()
    this.formsDespesa()
    this.getSaldo()
    
  }

  formsDespesa(){
    this.despesaForm = this.fb.group({
        categoriaGastoId: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        valor:['', [Validators.required]],
        data:['', [Validators.required]]
    })
  }

  getCategory(){
    this.budgetService.getCategory().subscribe({
      next: (response) => {
        this.categorias = response.dados
        this.getDespesa()

      },
      error: (err) => {
        console.error('Erro ao carregar categorias', err)
      }
    })
  }

  getDespesa(){
    this.budgetService.getGastoByTrip(this.viagemId).subscribe({
        next: (response) =>{
          this.despesas = response.dados
        },
        error: (err) => {
          console.error('Erro ao carregar despesas', err)
        }
    })
  }

  getSaldo(){
    this.budgetService.getSaldoRestante(this.viagemId).subscribe({
      next: (response) =>{
          this.saldo = response.saldo
        },
        error: (err) => {
          console.error('Erro ao carregar saldo', err)
        }
    })
  }

  addDspesa(){
    if(this.despesaForm.invalid){
      alert('Preencha todos os campos corretamente.')
      return
    }

    const newDespesa = this.despesaForm.value
    console.log('Enviando despesa:', newDespesa);

        this.budgetService.addGasto(this.viagemId, newDespesa).subscribe({
              next: (res) => {
          alert('Despesa adicionada com sucesso!');
          this.despesaForm.reset();
          // Aqui você pode recarregar a lista de despesas, se tiver uma função para isso
        },
        error: (err) => {
          console.error('Erro ao adicionar despesa', err);
          alert('Erro ao salvar despesa.');
        }
    })

  }

  deleteDespesa(id:string){
    this.budgetService.deleteGasto(id).subscribe({
      next:() => {
        this.despesas = this.despesas.filter(d => d._id !== id)
      },
      error: (error) => {
        console.error('Erro ao deletar despesa:', error);
      }
    })
  }

  get percentualGasto(): number {
    if (!this.saldo || this.saldo.orcamento === 0) {
      return 0;
    }
    return (this.saldo.totalGasto / this.saldo.orcamento) * 100;
  }


  getNomeCategoria(categoriaId: any): string {
    const id = typeof categoriaId === 'object' ? categoriaId._id : categoriaId;
    const categoria = this.categorias.find(cat => cat._id === id);
    return categoria ? categoria.nome : 'Categoria não encontrada';
  }
}
