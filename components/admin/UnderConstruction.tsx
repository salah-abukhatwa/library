import Image from "next/image";

type Props = {
  title: string;
  description?: string;
};

export default function UnderConstruction({ title, description }: Props) {
  return (
    <section className="w-full rounded-2xl bg-white p-6 sm:p-7">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-dark-400">{title}</h2>
      </div>

      <div className="mt-7 rounded-2xl bg-light-300 p-8 sm:p-10">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-white">
            <Image
              src="/icons/admin/empty.svg"
              alt="Under construction"
              width={44}
              height={44}
            />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-dark-400">
            Under Construction
          </h3>

          <p className="mt-1 text-sm text-light-500">
            {description ??
              "We’re working on this section. Check back soon for updates."}
          </p>
        </div>
      </div>
    </section>
  );
}
