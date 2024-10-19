import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es válido")
      .required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
    repeatPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseás tienen que ser iguales"),
    conditionAccepted: Yup.bool().isTrue(true),
  });
}
