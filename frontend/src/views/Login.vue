<template>
	<div class="container">
		<div class="container-1">
			<div class="container-2">
				<header id="header">
					<div class="noutil"></div>
					<div class="header-title">
						<h1 class="title is-centered"> Login de usuário </h1>
					</div>
				</header>
				<div class="erros">
					<span v-if="inputNull" class="err"> Preencha todos os campos!</span>
					<span v-if="invalid" class="err"> Usuário ou senha inválidos!</span>
				</div>
				<label class="label"> usuário</label>
				<div class="field">
					<p class="control has-icons-left">
						<input class="input" required type="text" v-model="name" placeholder="Usuário">
						<span class="icon is-small is-left">
							<i class="fas fa-user"></i>
						</span>
					</p>
				</div>
				<label class="label"> senha </label>
				<div class="field">
					<p class="control has-icons-left">
						<input class="input" required type="password" v-model="password" placeholder="Senha">
						<span class="icon is-small is-left">
							<i class="fas fa-lock"></i>
						</span>
					</p>
				</div>
				<button @click="login" class="btn">
					<span><i class="fas fa-arrow-right"></i></span>
					<span> logar </span>
				</button>
			</div>
		</div>

		<div class="container-1">
			<div class="container-2">
				<header id="header">
					<div class="noutil"></div>
					<div class="header-title">
						<h1 class="title is-centered"> Criar usuário </h1>
					</div>
				</header>
				<div class="erros">
					<span v-if="inputNull" class="err"> Preencha todos os campos!</span>
					<span v-if="invalidCreate" class="err"> Algo deu errado!</span>
				</div>
				<label class="label"> usuário </label>
				<div class="field">
					<p class="control has-icons-left">
						<input class="input" required type="text" v-model="newUsername" placeholder="Usuário">
						<span class="icon is-small is-left">
							<i class="fas fa-user"></i>
						</span>
					</p>
				</div>
				<label class="label"> senha </label>
				<div class="field">
					<p class="control has-icons-left">
						<input class="input" required type="password" v-model="newPassword" placeholder="Senha">
						<span class="icon is-small is-left">
							<i class="fas fa-lock"></i>
						</span>
					</p>
				</div>
				<button @click="create" class="btn">
					<span><i class="fas fa-arrow-right"></i></span>
					<span> criar </span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from 'axios';

	export default {

		data() {
			return {
				name: undefined,
				password: undefined,
				inputNull: false,
				invalid: false,
				invalidCreate: false,
				newUsername: undefined,
				newPassword: undefined,
			}
		},

		methods: {

			async login () {
				var username = this.name
				var password = this.password

				username = username.replace(/ /g, '')
				password = password.replace(/ /g, '')

				if (username != undefined && password != undefined || username != '' && password != '') {

					axios.post('http://localhost:7880/auth', {
						username: username,
						password: password

					}, {withCredentials: true}).then(res => {
						const userId = res.data.userId
						window.location.replace(`/chat/${userId}`);

					}).catch(() => {
						this.invalidCreate = true
					})
				} else {
					this.inputNull = true
				}
			},

			async create(){

				var username = this.newUsername
				var password = this.newPassword

				username = username.replace(/ /g, '')
				password = password.replace(/ /g, '')

				if (username != undefined && password != undefined || username != '' && password != '') {
					await axios.post(
						'http://localhost:7880/users', 
						{username, password, role:0}
					).then(res => {
						if (res.data.success == true) {
							this.newUsername = undefined
							this.newPassword = undefined
							alert('Usuário criado com sucesso!')
						} else {
							alert('Algo deu errado!')
						}
					}).catch(() => {
						alert('Algo deu errado!')
					})
				} else {
					this.inputNull = true
				}
			}
		}
	}
</script>

<style scoped>

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		width: 100%;
		min-width: 100vw;
		height: 100vh;
		background-color: var(--back-color);
		margin: 0;
	}
	.container-1 {
		max-width: 300px;
		background-color: var(--back-color);
	}
	.container-2 {
		width: 95%;
		height: 80%;
		margin: auto;
		background-color: var(--back-color-medium);
		border-radius: 10px;
		margin-bottom: 50px;
	}
	.field {
		width: 80%;
		margin: auto;
	}
	.label {
		float: left;
		display: block;
		margin-left: 20px;
		color: var(--text-color);
		margin-top: 20px;
	}
	.input {
		background-color: var(--back-color);
		color: var(--text-color);
		outline: none;
	}
	.input::-webkit-input-placeholder {
		color: var(--text-color);
	}
	.btn {
		margin-top: 20px;
		margin-bottom: 20px;
		width: 60%;
		height: 40px;
		border-radius: 15px;
		outline: none;
		background-color: transparent;
		color: #a8ffc2;
		border: solid 1px #a8ffc2;
		font-family: Verdana;
	}
	.btn:active {
		background-color: #a8ffc2;
		color: #000;
		transition: background-color .5s;
		border: #000;
	}
	.btn:hover {
		background-color: #a8ffc2;
		color: #000;
		transition: toright ,background-color 1s;
		border: #000;
	}
	#header {
		display: block;
		width: 80%;
		margin: 10%;
	}
	.header-title {
		margin-bottom: 20px;
	}
	.logo {
		max-width: 100px;
		text-align: center;
		display: block;
		margin: auto;
	}
	.img {
		display: block;
		width: 50px;
		margin: auto;
	}
	h1 {
		display: block;
		color: var(--text-full);
		font-size: var(--text-size-big);
		padding: auto;
		font-family: var(--text-font-especial);
	}
	.noutil {
		height: 20px;
	}
	.err {
		background-color: #f19999;
		color: #fa5a5a;
		width: 50%;
		font-size: var(--text-size-small);
		padding: 2px;
		margin: auto;
	}
	@media (min-width:768px) {
		.container-1 {
			width: 80%;
		}
	}

</style>