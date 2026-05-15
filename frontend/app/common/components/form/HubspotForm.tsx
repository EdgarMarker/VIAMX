"use client";
import "./form.scss";
import useHubspotForm from "@/app/common/hooks/useHubspotForm";
import { FORM_INSTANCES } from "@/app/common/utils/helper-hubspot";
import { useEffect } from "react";
import { useAnalytics } from "../../utils/AnalyticsProvider";

const HubspotForm = () => {
  const { track } = useAnalytics();
  const formConfig = FORM_INSTANCES.CONTACT;

  const baseFields = formConfig.fields.slice(0, 5);
  const customField = formConfig.fields[5];
  const messageField = formConfig.fields[6];

  const {
    register,
    handleSubmit,
    submissionState,
    formState: { errors },
  } = useHubspotForm(formConfig);

  useEffect(() => {
    if (submissionState.isSuccess) track("Lead");
  }, [submissionState.isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="form__contact">
      <div className="form__wrapper">
        {baseFields.map((field) => (
          <label key={field.name} className="form__field">
            <span>{field.label}</span>
            <input {...register(field.name)} type={field.type} />
            {errors[field.name] && (
              <span className="form__error">{errors[field.name]?.message as string}</span>
            )}
          </label>
        ))}

        <label className="form__field form__field--select">
          <span>{customField.label}</span>
          <select {...register(customField.name)}>
            <option value="">Selecciona una opción</option>
            {customField.options?.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors[customField.name] && (
            <span className="form__error">{errors[customField.name]?.message as string}</span>
          )}
        </label>
      </div>

      <label className="form__field form__field--textarea">
        <span>{messageField.label}</span>
        <textarea {...register(messageField.name)} rows={4} />
        {errors[messageField.name] && (
          <span className="form__error">{errors[messageField.name]?.message as string}</span>
        )}
      </label>

      <button className="btn" type="submit" disabled={submissionState.isSubmitting}>
        {submissionState.isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default HubspotForm;
