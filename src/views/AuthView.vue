<template>
  <div class="container">
    <div class="auth">
      <div class="auth__wrapper">
        <h1 class="auth__title">Sign in</h1>
        <form id="auth_form" class="auth__form" @submit.prevent="loginUser()">
          <label for="auth_email">Email</label>
          <input
            required
            id="auth_email"
            class="auth__input"
            type="email"
            v-model="authQuery.email"
          />
          <label for="auth_password">Пароль</label>
          <input
            required
            id="auth_password"
            class="auth__input"
            type="password"
            v-model="authQuery.password"
          />
        </form>
        <button form="auth_form" class="btn" type="submit">Sign in</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { authUser } from "@/api/user";
import router from "@/router";

export default {
  name: "AuthView",
  setup() {
    const authQuery = ref({
      email: "",
      password: "",
    });

    const loginUser = async () => {
      await authUser(authQuery.value)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          router.push("/");
        })
        .catch((e) => {
          alert("Error! " + e.response.data.message);
        });
    };

    return {
      authQuery,
      loginUser,
    };
  },
};
</script>
