import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from './models/produto.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProdutosService as ProdutosService } from './services/produto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // produtos: Produto[] = [];
  produtos: Observable<Produto[]>;
  title = 'ExemploFirebase';

  constructor(public produtosService: ProdutosService,private firestore: AngularFirestore){ }


formulario = new FormGroup({
    descricao: new FormControl(null),
  });


  ngOnInit(): void {

    // this.produtos = this.firestore.collection<Produto>('produtos',
    //  ref=> ref.orderBy('descricao')).valueChanges({idField: 'id'});
     

    // this.atualizarLista();
  }
    async adicionar(){

      const novoProduto = this.formulario.value as Produto;
      await this.produtosService.add(novoProduto);
    }

    async editar(produto: Produto){

      produto.descricao ='Editado ' + new Date();
      await this.firestore.collection('produtos').doc(produto.id).update(produto);
      // this.atualizarLista();
    }

    async excluir(produto: Produto){

      await this.firestore.collection('produtos').doc(produto.id).delete();
      // this.atualizarLista();
    }

    // atualizarLista(){
    //   this.firestore.collection<Produto>('produtos',

    //   // aqui deixa em ordem alfabetica
    //    ref => ref.orderBy('descricao')).get()
    //   .toPromise()
    //   .then(documentData => {
  
    //     // console.log(documentData.docs[0].data());
  
    //     this.produtos = documentData.docs.map(doc =>{ 
    //       return {
    //         id: doc.id, ...doc.data()
    //       } as Produto;
    //     });
  
    //     console.log(this.produtos);
  
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // }
}
