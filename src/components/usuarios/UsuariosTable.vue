<template>
    <div class="q-pa-md">
      <q-table
        title="Usuários"
        :rows="usuarios"
        :columns="colunaUsuario"
        row-key="id"
        :filter="filter"
        rows-per-page-label="Registros por página"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
        }"
        no-data-label="Nenhum Registro Encontrado"
        no-results-label="Nenhum Registro Encontrado">
        <template v-slot:top-right>
          <template v-if="user.perfil == 'ADMINISTRADOR'">
            <BtnCadastrar
              tooltip="Cadastrar Usuário"
              @cadastrar="cadastrar()" />
          </template>
          <q-space />
          <q-input dense debounce="300" color="grey-9" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <template v-if="user.perfil == 'ADMINISTRADOR'">
            <q-tr :props="props" >
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="noUsuario" :props="props">
                {{ props.row.noUsuario }}
              </q-td>
              <q-td key="perfil" :props="props">
                {{ props.row.perfil }}
              </q-td>
              <q-td key="acoes" :props="props">
                <BtnEditar
                  :tooltip="props.row.noUsuario"
                  @editar="editar(props.row.id)" />
                <template v-if="user.perfil == 'ADMINISTRADOR' && user.id != props.row.id">
                  <BtnExcluir
                    :tooltip="props.row.noUsuario"
                    @excluir="excluir(props.row.id)" />
                </template>
              </q-td>
            </q-tr>
          </template>
          <template v-else>
            <template v-if="user.id == props.row.id">
              <q-tr :props="props" >
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="noUsuario" :props="props">
                  {{ props.row.noUsuario }}
                </q-td>
                <q-td key="perfil" :props="props">
                  {{ props.row.perfil }}
                </q-td>
                <q-td key="acoes" :props="props">
                  <BtnEditar
                    :tooltip="props.row.noUsuario"
                    @editar="editar(props.row.id)" />
                  <template v-if="user.perfil == 'ADMINISTRADOR'">
                    <BtnExcluir
                      :tooltip="props.row.noUsuario"
                      @excluir="excluir(props.row.id)" />
                  </template>
                </q-td>
              </q-tr>
            </template>
          </template>
        </template>
      </q-table>
    </div>
  </template>
  
  <script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { useQuasar } from 'quasar';
    import { ref } from 'vue';
    import { Usuario } from 'src/interfaces/interfaces';
    import { colunaUsuario } from 'src/layouts/colunas/colunas';
    import { user } from 'src/services/utils/utils';
    import ApiService from 'src/services/http/api';
    import BtnCadastrar from 'src/components/shared/BtnCadastrar.vue';
    import BtnEditar from 'src/components/shared/BtnEditar.vue';
    import BtnExcluir from 'src/components/shared/BtnExcluir.vue';
  
    const router = useRouter();
    const $q = useQuasar();
    const filter = ref('');
    const usuarios = ref<Usuario[]>();
    const api = new ApiService();

    $q.loading.show({
      delay: 400,
      message: 'Recuperando Informações do Banco de Dados'
    });
  
    api.get('api/login/todos')
      .then((response => {
        usuarios.value = response.data;
      })).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      }).finally(() => {
        $q.loading.hide();
      });
      
      const excluir = async (id : Number) => {
        $q.loading.show({
          delay: 400,
          message: 'Recuperando Informações do Banco de Dados'
        });
        
        api.delete(`api/login/${id}/deletar`)
          .then(() => {
            api.get('api/login/todos')
              .then((response => {
                usuarios.value = response.data;
              })).catch((e) => {
                $q.notify({
                  color: 'negative',
                  position: 'top',
                  message: e.response.data,
                  icon: 'report_problem'
                });
              });
            $q.notify({
                color: 'positive',
                position: 'top',
                message: 'Usuário excluído com sucesso',
                icon: "check"
            });
          }).catch((e) => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: e.response.data,
              icon: 'report_problem'
            });
          }).finally(() => {
            $q.loading.hide();
          });
        }
        
      const cadastrar = () => {
        router.push({path: '/usuarios/cadastrar'});
      }
  
      const editar = (id: Number) => {
        router.push({path: `/usuarios/editar/${id}`});
      }
  
  </script>
  