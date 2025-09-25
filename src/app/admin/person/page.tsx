import CreatePersonForm from "@/components/forms/create-person-form";

export default async function AdminPersonPage() {
  return (
    <div className="flex justify-between gap-5">
      <CreatePersonForm />
    </div>
  );
}
