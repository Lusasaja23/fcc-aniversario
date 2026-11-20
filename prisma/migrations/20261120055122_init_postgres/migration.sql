-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "modalidad" TEXT NOT NULL,
    "identificador" TEXT NOT NULL,
    "integrantes" TEXT,
    "cantidad" INTEGER NOT NULL,
    "contacto" TEXT NOT NULL,
    "notificar" BOOLEAN NOT NULL DEFAULT false,
    "recordatorioEnviado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registro_identificador_key" ON "Registro"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "Registro_contacto_key" ON "Registro"("contacto");
