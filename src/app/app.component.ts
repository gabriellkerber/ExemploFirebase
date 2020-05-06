import { Component, OnInit } from '@angular/core';
import { Produto } from './models/produto.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProdutosService } from './services/produtos.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  produtos: Observable<Produto[]>;

  porcentagemEnvio: Observable<number>;
  url: Observable<string>;

  formulario = new FormGroup({
    descricao: new FormControl(null),
  });

  constructor(
    public produtosService: ProdutosService,
    private storage: AngularFireStorage
  ) { }

  async ngOnInit(){

    this.produtos = this.produtosService.getObservable();

    // para modificar valores que vem do banco

    // const p = await  this.produtosService.getAll();
    // p[0].descricao = 'funcionou o get All';
    // console.log(p);
  }

  async adicionar() {

    const novoProduto = this.formulario.value as Produto;

    await this.produtosService.add(novoProduto);

  }

  async deletar(produto: Produto) {

    await this.produtosService.delete(produto);
  }

  async editar(produto: Produto) {
    console.log(produto);
    await this.produtosService.update(produto);
  }

  uploadFile(event) {
    const file = event.target.files[0];

    const nomeArquivo = 'arquivo teste';

    const fileRef = this.storage.ref(nomeArquivo);
    const task = this.storage.upload(nomeArquivo, file);

    this.porcentagemEnvio = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.url = fileRef.getDownloadURL())
    ).subscribe();

  }

}

