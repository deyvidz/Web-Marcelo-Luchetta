export function GridLayout({type, children}) {
  return (
    <section className='bg-backgroundb w-2/3 h-auto justify-center  py-10 mt-16 text-center mx-auto rounded-2xl'>
      <h2 className="text-2xl font-bold text-text/90">{type}</h2>
      <div className='grid grid-rows-2 grid-cols-6 gap-4  w-11/12 mx-auto'>
        {children}
      </div>

    </section>
  );
}